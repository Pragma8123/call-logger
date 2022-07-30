<script lang="ts">
  export let displayName: string;
  export let email: string;
  export let photoURL: string;
</script>

<figure class="image is-96x96">
  <img class="is-rounded" src={photoURL} alt="profile" />
</figure>
<p>
  <strong>Name:</strong> { displayName }<br>
  <strong>Email:</strong> { email }<br>
</p>
