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
    <p class="buttons">
      <button
        class="button is-warning is-outlined is-small is-rounded"
        title="Edit"
        disabled
      >
        <span class="icon">
          <i class="fas fa-pencil"></i>
        </span>
      </button>
      <button
        on:click={remove}
        class="button is-danger is-outlined is-small is-rounded"
        title="Delete"
      >
        <span class="icon">
          <i class="fas fa-trash"></i>
        </span>
      </button>
    </p>
  </td>
</tr>
