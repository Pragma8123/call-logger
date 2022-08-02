<script lang="ts">
import { createEventDispatcher } from 'svelte';
import type { User } from 'firebase/auth';

export let user: User;
let burgerActive: boolean = false;

const dispatch = createEventDispatcher();

function login(): void {
  dispatch('login');
}

function logout(): void {
  dispatch('logout');
}

function toggleBurger(): void {
  burgerActive = !burgerActive;
}
</script>

<nav class="navbar is-light has-shadow" aria-label="main navigation">
  <div class="navbar-brand">
    <div class="navbar-item">
      <p class="title is-4">
        Call Logs
      </p>
    </div>

    <button on:click={toggleBurger} class:is-active={burgerActive} class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarPrimary">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  </div>

  <div id="navbarPrimary" class="navbar-menu" class:is-active={burgerActive}>
    <div class="navbar-end">
      <div class="navbar-item">
        {#if user}
        <figure class="image">
          <img class="is-rounded" src={user.photoURL} alt="">
        </figure>
        {/if}
      </div>
      <div class="navbar-item">
        {#if user}
        <button on:click={logout} class="button is-small is-rounded">
          Logout
        </button>
        {:else}
        <button on:click={login} class="button is-small is-rounded">
          Login
        </button>
        {/if}
      </div>
    </div>
  </div>
</nav>
