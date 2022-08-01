<script lang="ts">
  import { collection, doc, where, query, orderBy, deleteDoc } from 'firebase/firestore';
  import { collectionData } from 'rxfire/firestore';
  import { startWith } from 'rxjs/operators';
  import { db } from '../firebase';
  import CallItem from './CallItem.svelte';

  export let uid: string;

  const calls = collectionData(query(collection(db, 'calls'), where('uid', '==', uid), orderBy('date')), { idField: 'id'}).pipe(startWith([]));

  function remove(event): void {
    deleteDoc(doc(db, 'calls', event.detail.id));
  }
</script>

<table class="table">
  <thead>
    <tr>
      <th>Phone Number</th>
      <th>Duration</th>
      <th>Date</th>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {#each $calls as call}
    <CallItem on:remove={remove} {...call} />
    {/each}
  </tbody>
</table>
