<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { User } from 'firebase/auth';
  import { faUser, faHeadset } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  export let user: User;

  const dispatch = createEventDispatcher();
  let burgerActive: boolean = false;

  function login(): void {
    dispatch('login');
    burgerActive = false;
  }

  function logout(): void {
    dispatch('logout');
  }

  function showExportModal(): void {
    dispatch('showExportModal');
  }

  function toggleBurger(): void {
    burgerActive = !burgerActive;
  }
</script>

<nav class="navbar is-link is-light has-shadow" aria-label="main navigation">
  <div class="container">
    <div class="navbar-brand">
      <div class="navbar-item">
        <span class="icon-text">
          <span class="icon">
            <Fa icon={faHeadset} size="lg" />
          </span>
          <span>
            <strong class="title is-5 has-text-white">Call Logs</strong>
          </span>
        </span>
      </div>

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
        {#if user}
          <a on:click={showExportModal} class="navbar-item" href="#export">
            Export
          </a>
        {/if}
      </div>

      <div class="navbar-end">
        {#if user}
          <div class="navbar-item">
            <figure class="image is-24x24">
              <img
                src={user.photoURL}
                alt=""
                title={user.displayName}
                class="is-rounded"
              />
            </figure>
          </div>
          <div class="navbar-item">
            <a
              href="/"
              on:click={logout}
              class="button is-small is-rounded is-link is-light"
            >
              <span class="icon">
                <Fa icon={faUser} />
              </span>
              <span><strong>Log Out</strong></span>
            </a>
          </div>
        {:else}
          <div class="navbar-item">
            <button
              on:click={login}
              class="button is-small is-rounded is-link is-light"
            >
              <span class="icon">
                <Fa icon={faUser} />
              </span>
              <span><strong>Log In</strong></span>
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</nav>

<style global lang="sass">
  @import "bulma/sass/utilities/_all"
  @import "bulma/sass/helpers/_all"
  @import "bulma/sass/components/navbar"
  @import "bulma/sass/elements/icon"
  @import "bulma/sass/elements/image"
  @import "bulma/sass/elements/button"
  @import "bulma/sass/elements/container"
  @import "bulma/sass/elements/title"
</style>
