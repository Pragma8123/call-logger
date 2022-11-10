<script lang="ts">
  import type { Observable } from 'rxjs';
  import { createEventDispatcher } from 'svelte';
  import CallItem from './CallItem.svelte';

  export let calls: Observable<any[]>;

  const dispatch = createEventDispatcher();

  function loadMore(): void {
    dispatch('more');
  }

  function loadLess(): void {
    dispatch('less');
  }
</script>

<div class="table-container">
  <table class="table is-narrow is-hoverable is-size-7-touch">
    <thead>
      <tr>
        <th>
          <abbr title="Phone Number">Number</abbr>
        </th>
        <th>Duration</th>
        <th>Date</th>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each $calls as call}
        <CallItem on:remove {call} />
      {/each}
    </tbody>
  </table>
</div>

<div class="buttons has-addons is-right">
  <button on:click={loadMore} class="button is-link is-rounded">More</button>
  <button
    on:click={loadLess}
    class="button is-link is-light is-rounded"
    disabled={$calls.length <= 10}>Less</button
  >
</div>

<style global lang="sass">
  @import "bulma/sass/utilities/_all"
  @import "bulma/sass/helpers/_all"
  @import "bulma/sass/elements/table"
  @import "bulma/sass/elements/button"
</style>
