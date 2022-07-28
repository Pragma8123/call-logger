<script lang="ts">
  import { auth } from './firebase';
  import { signInWithPopup, GoogleAuthProvider, signOut, type User } from 'firebase/auth';
  import { authState } from 'rxfire/auth';
  import type { Observable } from 'rxjs';

  import Profile from './lib/Profile.svelte';

  let user: Observable<User> = authState(auth);

  function login(): void {
    signInWithPopup(auth, new GoogleAuthProvider());
  }

  function logout(): void {
    signOut(auth);
  }
</script>

<main>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Hello World
      </h1>
      <p class="subtitle">
        This website is powered by <strong>Bulma</strong>!
      </p>
      <p class="content">
        {#if $user}
        <Profile {...$user} />
        <button on:click={logout} class="button is-primary">
          Logout
        </button>
        {:else}
        <button on:click={login} class="button is-primary">
          Login
        </button>
        {/if}
      </p>
    </div>
  </section>
</main>
