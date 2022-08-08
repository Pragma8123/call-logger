<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let id: string;
  export let phoneNumber: string;
  export let talkTime: string;
  export let date: string;
  export let callerName: string;
  export let description: string;

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch('remove', { id });
  }
</script>

<tr>
  <td>{phoneNumber}</td>
  <td>{talkTime}</td>
  <td>{date}</td>
  <td>{callerName}</td>
  <td>
    {#if description.length > 20}
      <abbr title={description}>{description.slice(0, 20) + '...'}</abbr>
    {:else}
      {description}
    {/if}
  </td>
  <td>
    <button
      on:click={remove}
      class="button is-danger is-light is-small is-rounded">🗑️</button
    >
  </td>
</tr>
