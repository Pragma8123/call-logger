<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Fa from 'svelte-fa';
  import { fade } from 'svelte/transition';
  import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

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

<tr in:fade>
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
          <Fa icon={faPencil} />
        </span>
      </button>
      <button
        on:click={remove}
        class="button is-danger is-outlined is-small is-rounded"
        title="Delete"
      >
        <span class="icon">
          <Fa icon={faTrash} />
        </span>
      </button>
    </p>
  </td>
</tr>

<style global lang="sass">
  @import "bulma/sass/utilities/_all"
  @import "bulma/sass/helpers/_all"
  @import "bulma/sass/elements/icon"
  @import "bulma/sass/elements/button"
  @import "bulma/sass/elements/table"
</style>
