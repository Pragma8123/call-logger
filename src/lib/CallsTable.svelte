<script lang="ts">
  import {
    collection,
    doc,
    where,
    query,
    orderBy,
    deleteDoc,
    limit,
  } from 'firebase/firestore';
  import { collectionData } from 'rxfire/firestore';
  import { startWith } from 'rxjs/operators';
  import { db } from '../firebase';
  import CallItem from './CallItem.svelte';

  export let uid: string;

  let pageSize: number = 10;

  let callsRef = query(
    collection(db, 'calls'),
    where('uid', '==', uid),
    orderBy('created', 'desc'),
    limit(pageSize),
  );

  let calls = collectionData(callsRef, { idField: 'id' }).pipe(startWith([]));

  function loadMore(): void {
    pageSize += 10;

    callsRef = query(
      collection(db, 'calls'),
      where('uid', '==', uid),
      orderBy('created', 'desc'),
      limit(pageSize),
    );

    calls = collectionData(callsRef, { idField: 'id' }).pipe(startWith([]));
  }

  function loadLess(): void {
    pageSize -= 10;

    callsRef = query(
      collection(db, 'calls'),
      where('uid', '==', uid),
      orderBy('created', 'desc'),
      limit(pageSize),
    );

    calls = collectionData(callsRef, { idField: 'id' }).pipe(startWith([]));
  }

  function remove(event): void {
    deleteDoc(doc(db, 'calls', event.detail.id));
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
        <th>Modify</th>
      </tr>
    </thead>
    <tbody>
      {#each $calls as call}
        <CallItem
          on:remove={remove}
          id={call.id}
          phoneNumber={call.phoneNumber}
          talkTime={call.talkTime}
          date={call.date}
          callerName={call.callerName}
          description={call.description}
        />
      {/each}
    </tbody>
  </table>
</div>

<div class="buttons has-addons">
  <button on:click={loadMore} class="button is-link is-rounded">More</button>
  <button
    on:click={loadLess}
    class="button is-link is-light is-rounded"
    disabled={pageSize <= 10}>Less</button
  >
</div>
