<script lang="ts">
  import 'bulma';
  import { auth, analytics } from './firebase';
  import { logEvent } from 'firebase/analytics';
  import { signInWithPopup, GoogleAuthProvider, signOut, type User } from 'firebase/auth';
  import { authState } from 'rxfire/auth';
  import type { Observable } from 'rxjs';
  import Navbar from './lib/Navbar.svelte';
  import CallForm from './lib/CallForm.svelte';
  import CallsTable from './lib/CallsTable.svelte';

  let user: Observable<User> = authState(auth);

  function login(): void {
    signInWithPopup(auth, new GoogleAuthProvider());
    logEvent(analytics, 'login');
  }

  function logout(): void {
    signOut(auth);
    logEvent(analytics, 'logout');
  }
</script>

<main>
  <Navbar on:login={login} on:logout={logout} user={$user} />
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
