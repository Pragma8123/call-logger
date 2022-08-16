<script lang="ts">
  import 'bulma';
  import { logEvent } from 'firebase/analytics';
  import { signInWithPopup, GoogleAuthProvider, signOut, type User } from 'firebase/auth';
  import { authState } from 'rxfire/auth';
  import { getDocs, query, collection, where, orderBy } from 'firebase/firestore';
  import type { Observable } from 'rxjs';
  import { auth, analytics, db } from './firebase';
  import Navbar from './lib/Navbar.svelte';
  import CallForm from './lib/CallForm.svelte';
  import CallsTable from './lib/CallsTable.svelte';
  import ExportModal from './lib/ExportModal.svelte';
  import { downloadFile, formatCall } from './util';

  let user: Observable<User> = authState(auth);
  let showExportModal: boolean = false;

  function login(): void {
    signInWithPopup(auth, new GoogleAuthProvider());
    logEvent(analytics, 'login');
  }

  function logout(): void {
    signOut(auth);
    logEvent(analytics, 'logout');
  }

  async function exportCalls(event: CustomEvent): Promise<void> {
    const { startDate, endDate } = event.detail;

    const calls = await getDocs(query(
      collection(db, 'calls'),
      where('uid', '==', $user.uid),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'desc'),
      orderBy('created', 'desc'),
    ));

    let data: string = '';
    calls.forEach((call) => data += formatCall(call.data()));
    downloadFile(`${startDate}_${endDate}.txt`, data);
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
      <div class="columns">
        <div class="column">
          <div class="box">
            <CallForm uid={$user.uid} />
          </div>
        </div>
        <div class="column is-two-thirds">
          <CallsTable uid={$user.uid} />
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
