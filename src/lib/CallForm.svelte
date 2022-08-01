<script lang="ts">
  import { uniqueNamesGenerator, type Config, starWars } from 'unique-names-generator';
  import { addDoc, collection } from 'firebase/firestore';
  import { db } from '../firebase';

  export let uid: string;
  let callerName: string    = '';
  let date: string          = '';
  let description: string   = '';
  let phoneNumber: string   = '';
  let talkTime: string      = '';

  const uniqueNameConfig: Config = {
    dictionaries: [starWars],
  };
  let randomName: string = uniqueNamesGenerator(uniqueNameConfig);

  function submit(): void {
    addDoc(collection(db, 'calls'), {
      callerName,
      date,
      description,
      phoneNumber,
      talkTime,
      uid,
    });
    reset();
  }

  function reset(): void {
    phoneNumber = '';
    talkTime    = '';
    date        = '';
    callerName  = '';
    description = '';
    randomName  = uniqueNamesGenerator(uniqueNameConfig);
  }
</script>

<!-- Phone Number -->
<div class="field">
  <label for="call-number" class="label">Phone</label>
  <div class="control">
    <input id="call-number" class="input" type="tel" placeholder="(317) 867-5309" bind:value={phoneNumber}>
  </div>
</div>

<!-- Call Duration -->
<div class="field">
  <label for="call-duration" class="label">Call Duration</label>
  <div class="control">
    <input id="call-duration" class="input" type="text" placeholder="15:00" bind:value={talkTime}>
  </div>
</div>

<!-- Date -->
<div class="field">
  <label for="call-date" class="label">Date</label>
  <div class="control">
    <input id="call-date" class="input" type="date" bind:value={date}>
  </div>
</div>

<!-- Name -->
<div class="field">
  <label for="call-name" class="label">Name</label>
  <div class="control">
    <input id="call-name" class="input" type="text" placeholder={randomName} bind:value={callerName}>
  </div>
</div>

<!-- Description -->
<div class="field">
  <label for="call-description" class="label">Description</label>
  <div class="control">
    <input id="call-description" class="input" type="text" placeholder="Existing ticket..." bind:value={description}>
  </div>
</div>

<!-- Submit or Cancel Buttons -->
<div class="field is-grouped">
  <div class="control">
    <button on:click={submit} class="button is-link">Submit</button>
  </div>
  <div class="control">
    <button on:click={reset} class="button is-link is-light">Cancel</button>
  </div>
</div>
