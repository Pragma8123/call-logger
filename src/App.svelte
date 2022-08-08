<script lang="ts">
  import 'bulma';
  import '@fortawesome/fontawesome-free/js/solid';
  import { auth } from './firebase';
  import { signInWithPopup, GoogleAuthProvider, signOut, type User } from 'firebase/auth';
  import { authState } from 'rxfire/auth';
  import type { Observable } from 'rxjs';
  import Navbar from './lib/Navbar.svelte';
  import CallForm from './lib/CallForm.svelte';
  import CallsTable from './lib/CallsTable.svelte';

  let user: Observable<User> = authState(auth);

  function login(): void {
    signInWithPopup(auth, new GoogleAuthProvider());
  }

  function logout(): void {
    signOut(auth);
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
