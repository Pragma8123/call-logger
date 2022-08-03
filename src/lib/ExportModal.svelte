<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ExportForm from './ExportForm.svelte';

  export let active: boolean;

  const dispatch = createEventDispatcher();

  function close(): void {
    dispatch('close');
  }
</script>

<div class="modal" class:is-active={active}>
  <div on:click={close} class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Export Calls</p>
      <button on:click={close} class="delete" aria-label="close" />
    </header>
    <section class="modal-card-body">
      <ExportForm />
    </section>
    <footer class="modal-card-foot">
      <button class="button is-link is-rounded">Export</button>
      <button on:click={close} class="button is-link is-light is-rounded">
        Cancel
      </button>
    </footer>
  </div>
</div>
