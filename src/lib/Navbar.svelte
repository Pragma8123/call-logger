<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { User } from 'firebase/auth';
  import ExportModal from './ExportModal.svelte';

  export let user: User;

  const dispatch = createEventDispatcher();
  let burgerActive: boolean = false;
  let exportModalActive: boolean = false;

  function login(): void {
    dispatch('login');
    burgerActive = false;
  }

  function logout(): void {
    dispatch('logout');
  }

  function toggleBurger(): void {
    burgerActive = !burgerActive;
  }
</script>

<nav class="navbar is-link is-light has-shadow" aria-label="main navigation">
  <div class="container">
    <div class="navbar-brand">
      <div class="navbar-item">Call Logs</div>

      <button
        on:click={toggleBurger}
        class:is-active={burgerActive}
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarPrimary"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </div>

    <div id="navbarPrimary" class="navbar-menu" class:is-active={burgerActive}>
      <div class="navbar-start">
        <a
          on:click={() => (exportModalActive = true)}
          class="navbar-item"
          href="#export"
        >
          Export
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          {#if user}
            <a
              href="/"
              on:click={logout}
              class="button is-small is-rounded is-link is-light"
            >
              Logout
            </a>
          {:else}
            <button
              on:click={login}
              class="button is-small is-rounded is-link is-light"
            >
              Login
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>

<ExportModal
  on:close={() => (exportModalActive = false)}
  active={exportModalActive}
/>
