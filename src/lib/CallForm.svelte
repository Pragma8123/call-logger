<script lang="ts">
  import {
    uniqueNamesGenerator,
    type Config,
    starWars,
  } from 'unique-names-generator';
  import { addDoc, collection } from 'firebase/firestore';
  import { db } from '../firebase';

  export let uid: string;

  let callerName: string = '';
  let date: string = '';
  let description: string = '';
  let phoneNumber: string = '';
  let talkTime: string = '';

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
    talkTime = '';
    date = '';
    callerName = '';
    description = '';
    randomName = uniqueNamesGenerator(uniqueNameConfig);
  }
</script>

<form on:submit|preventDefault={submit}>
  <!-- Phone Number -->
  <div class="field">
    <label for="call-number" class="label">Phone</label>
    <div class="control has-icons-left">
      <input
        bind:value={phoneNumber}
        id="call-number"
        class="input is-rounded is-size-7-touch"
        type="tel"
        size="20"
        minlength="9"
        maxlength="20"
        placeholder="e.g (555) 867-5309"
        required
      />
      <span class="icon is-small is-left">
        <i class="fas fa-phone" />
      </span>
    </div>
  </div>

  <div class="columns">
    <!-- Call Duration -->
    <div class="column">
      <div class="field">
        <label for="call-duration" class="label">
          <abbr title="Call Duration">Duration</abbr>
        </label>
        <div class="control has-icons-left">
          <input
            bind:value={talkTime}
            id="call-duration"
            class="input is-rounded is-size-7-touch"
            type="text"
            size="10"
            minlength="2"
            maxlength="6"
            placeholder="e.g 15:00"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-clock" />
          </span>
        </div>
      </div>
    </div>

    <!-- Date -->
    <div class="column">
      <div class="field">
        <label for="call-date" class="label">Date</label>
        <div class="control has-icons-left">
          <input
            id="call-date"
            class="input is-rounded is-size-7-touch"
            type="date"
            bind:value={date}
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-calendar" />
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Name -->
  <div class="field">
    <label for="call-name" class="label">Name</label>
    <div class="control has-icons-left">
      <input
        bind:value={callerName}
        id="call-name"
        class="input is-rounded is-size-7-touch"
        type="text"
        size="50"
        minlength="2"
        maxlength="50"
        placeholder={`e.g ${randomName}`}
        required
      />
      <span class="icon is-small is-left">
        <i class="fas fa-user" />
      </span>
    </div>
  </div>

  <!-- Description -->
  <div class="field">
    <label for="call-description" class="label">Description</label>
    <div class="control has-icons-left">
      <input
        bind:value={description}
        id="call-description"
        class="input is-rounded is-size-7-touch"
        type="text"
        size="100"
        maxlength="100"
        placeholder="e.g Existing ticket 12345"
        required
      />
      <span class="icon is-small is-left">
        <i class="fas fa-clipboard" />
      </span>
    </div>
  </div>

  <!-- Submit or Cancel Buttons -->
  <div class="field has-addons">
    <div class="control">
      <input
        class="button is-link is-rounded is-size-7-touch"
        type="submit"
        value="Add"
      />
    </div>
    <div class="control">
      <input
        on:click={reset}
        class="button is-link is-light is-rounded is-size-7-touch"
        type="reset"
        value="Reset"
      />
    </div>
  </div>
</form>
