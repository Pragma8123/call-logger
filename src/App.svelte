<script lang="ts">
  import { logEvent } from 'firebase/analytics';
  import { signInWithPopup, GoogleAuthProvider, signOut, type User } from 'firebase/auth';
  import { authState } from 'rxfire/auth';
  import { getDocs, query, collection, where, orderBy, limit, deleteDoc, doc } from 'firebase/firestore';
  import { collectionData } from 'rxfire/firestore';
  import { startWith, type Observable } from 'rxjs';
  import { auth, analytics, db } from './firebase';
  import Navbar from './lib/Navbar.svelte';
  import CallForm from './lib/CallForm.svelte';
  import CallsTable from './lib/CallsTable.svelte';
  import ExportModal from './lib/ExportModal.svelte';
  import { downloadFile, formatCall } from './util';

  let user: Observable<User> = authState(auth);
  let showExportModal: boolean = false;
  let callCount: number = 10; // Initially load 10 calls
  let calls: Observable<any[]>;

  function login(): void {
    signInWithPopup(auth, new GoogleAuthProvider());
    logEvent(analytics, 'login');
  }

  function logout(): void {
    signOut(auth);
    logEvent(analytics, 'logout');
  }

  function deleteCall(event: CustomEvent): void {
    deleteDoc(doc(db, 'calls', event.detail.id));
  }

  async function exportCalls(event: CustomEvent): Promise<void> {
    const { startDate, endDate } = event.detail;

    const calls = await getDocs(query(
      collection(db, 'calls'),
      where('uid', '==', $user.uid),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'asc'),
      orderBy('created', 'asc'),
    ));

    let data: string = '';
    calls.forEach((call) => data += formatCall(call.data()));
    downloadFile(`CallLogs_${startDate}_${endDate}.txt`, data);
  }

  function loadMore(): void {
    callCount += 10;
  }

  function loadLess(): void {
    callCount -= 10;
  }

  $: {
    if ($user) {
      calls = collectionData(
        query(
          collection(db, 'calls'),
          where('uid', '==', $user.uid),
          orderBy('created', 'desc'),
          limit(callCount),
        ),
        { idField: 'id' },
      ).pipe(startWith([]));
    }
  }
</script>

<main>
  <Navbar
    on:login={login}
    on:logout={logout}
    on:showExportModal={() => showExportModal = true}
    user={$user} />
  <section class="section">
    <div class="container">
      {#if $user}
      <div class="columns is-desktop">
        <div class="column is-half-tablet is-one-third-desktop">
          <div class="box">
            <CallForm uid={$user.uid} />
          </div>
        </div>
        <div class="column is-two-thirds-desktop">
          <div class="box">
            <CallsTable
              on:more={loadMore}
              on:less={loadLess}
              on:remove={deleteCall}
              {calls}
            />
          </div>
        </div>
      </div>
      {/if}
    </div>
  </section>
</main>

<ExportModal
  on:close={() => showExportModal = false}
  on:export={exportCalls}
  active={showExportModal}
/>

<style global lang="sass">
  @import "bulma/sass/base/_all.sass"
  @import "bulma/sass/utilities/_all.sass"
  @import "bulma/sass/grid/columns.sass"
  @import "bulma/sass/layout/section.sass"
  @import "bulma/sass/elements/box.sass"
  @import "bulma/sass/elements/container.sass"
</style>
