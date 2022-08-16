<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { faCalendar } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  export let active: boolean;

  let startDate: string = '';
  let endDate: string = '';
  const dispatch = createEventDispatcher();

  function exportCalls(): void {
    dispatch('export', {
      startDate,
      endDate,
    });
    active = false;
  }

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
      <div class="columns">
        <div class="column">
          <div class="field">
            <label for="start-date" class="label"> Start Date </label>
            <div class="control has-icons-left">
              <input
                bind:value={startDate}
                id="start-date"
                class="input is-rounded is-size-7-touch"
                type="date"
                required
              />
              <span class="icon is-small is-left">
                <Fa icon={faCalendar} />
              </span>
            </div>
            {#if startDate > endDate}
              <p class="help is-danger">Start date must be before end date</p>
            {/if}
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label for="end-date" class="label"> End Date </label>
            <div class="control has-icons-left">
              <input
                bind:value={endDate}
                id="end-date"
                class="input is-rounded is-size-7-touch"
                type="date"
                required
              />
              <span class="icon is-small is-left">
                <Fa icon={faCalendar} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <p>startDate: {startDate}</p>
      <p>endDate: {endDate}</p>
    </section>
    <footer class="modal-card-foot">
      <div class="buttons has-addons">
        <button
          on:click={exportCalls}
          class="button is-link is-rounded"
          disabled={startDate > endDate || startDate === ''}>Export</button
        >
        <button on:click={close} class="button is-link is-light is-rounded"
          >Cancel</button
        >
      </div>
    </footer>
  </div>
</div>
