<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Fa from 'svelte-fa';
  import { fade } from 'svelte/transition';
  import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

  export let call = {
    id: '',
    phoneNumber: '',
    talkTime: '',
    date: '',
    callerName: '',
    description: '',
  };

  let buttonsVisible: boolean = false;

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch('remove', { id: call.id });
  }
</script>

<tr
  in:fade
  on:mouseenter={() => (buttonsVisible = true)}
  on:mouseleave={() => (buttonsVisible = false)}
>
  <td>{call.phoneNumber}</td>
  <td>{call.talkTime}</td>
  <td>{call.date}</td>
  <td>{call.callerName}</td>
  <td>
    {#if call.description.length > 35}
      <abbr title={call.description}>
        {call.description.slice(0, 32) + '...'}
      </abbr>
    {:else}
      {call.description}
    {/if}
  </td>
  <div class="field has-addons" class:is-invisible={!buttonsVisible}>
    <p class="control">
      <button
        class="button is-inverted is-outlined is-small is-rounded"
        title="Edit"
        disabled
      >
        <span class="icon">
          <Fa icon={faPencil} />
        </span>
      </button>
    </p>
    <p class="control">
      <button
        on:click={remove}
        class="button is-inverted is-outlined is-small is-rounded"
        title="Delete"
      >
        <span class="icon">
          <Fa icon={faTrash} />
        </span>
      </button>
    </p>
  </div>
</tr>

<style global lang="sass">
  @import "bulma/sass/utilities/_all"
  @import "bulma/sass/helpers/_all"
  @import "bulma/sass/elements/icon"
  @import "bulma/sass/elements/button"
  @import "bulma/sass/elements/table"
</style>
