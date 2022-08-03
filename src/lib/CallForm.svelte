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
      created: Date.now(),
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

<form on:submit|preventDefault={submit}>
  <!-- Phone Number -->
  <div class="field">
    <label for="call-number" class="label">Phone</label>
    <div class="control">
      <input
        bind:value={phoneNumber}
        id="call-number"
        class="input"
        type="tel"
        size="20"
        minlength="9"
        maxlength="20"
        placeholder="e.g (555) 867-5309"
        required>
    </div>
  </div>

  <div class="columns">

    <!-- Call Duration -->
    <div class="column">
      <div class="field">
        <label for="call-duration" class="label">Call Duration</label>
        <div class="control">
          <input
            bind:value={talkTime}
            id="call-duration"
            class="input"
            type="text"
            size="10"
            minlength="2"
            maxlength="6"
            placeholder="e.g 15:00"
            required>
        </div>
      </div>
    </div>

    <!-- Date -->
    <div class="column">
      <div class="field">
        <label for="call-date" class="label">Date</label>
        <div class="control">
          <input id="call-date" class="input" type="date" bind:value={date} required>
        </div>
      </div>
    </div>
  </div>

  <!-- Name -->
  <div class="field">
    <label for="call-name" class="label">Name</label>
    <div class="control">
      <input
        bind:value={callerName}
        id="call-name"
        class="input"
        type="text"
        size="50"
        minlength="2"
        maxlength="50"
        placeholder={`e.g ${randomName}`}
        required>
    </div>
  </div>

  <!-- Description -->
  <div class="field">
    <label for="call-description" class="label">Description</label>
    <div class="control">
      <input
        bind:value={description}
        id="call-description"
        class="input"
        type="text"
        size="100"
        maxlength="100"
        placeholder="e.g Existing ticket 12345"
        required>
    </div>
  </div>

  <!-- Submit or Cancel Buttons -->
  <div class="field is-grouped">
    <div class="control">
      <input class="button is-link is-rounded" type="submit" value="Add">
    </div>
    <div class="control">
      <input on:click={reset} class="button is-link is-light is-rounded" type="reset" value="Reset">
    </div>
  </div>
</form>
