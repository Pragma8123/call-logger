<script lang="ts">
  export let displayName: string;
  export let email: string;
  export let uid: string;
  export let photoURL: string;
</script>

<figure class="image is-128x128">
  <img src={photoURL} alt="profile" />
</figure>
<p><strong>Name:</strong> { displayName }</p>
<p><strong>Email:</strong> { email }</p>
<p><strong>uid:</strong> { uid }</p>
