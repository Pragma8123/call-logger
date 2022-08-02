<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

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

<tr transition:fade>
  <td>{phoneNumber}</td>
  <td>{talkTime}</td>
  <td>{date}</td>
  <td>{callerName}</td>
  <td>{description}</td>
  <td><button on:click={remove} class="button is-small">🗑️</button></td>
</tr>
