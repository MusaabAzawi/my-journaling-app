<script>
  import { onMount } from 'svelte';
  let message = '';
  let name = '';
  let greeting = '';

  onMount(async () => {
    try {
      const res = await fetch('/journal');
      const data = await res.json();
      message = data.message || data.error || 'No message received.';
    } catch (err) {
      message = 'Error fetching the journaling message.';
      console.error(err);
    }
  });

  function handlesub() {
    greeting = `Hello, ${name}!`;
  }
</script>

<h1>Journaling Page</h1>

<div class="entry">
  <input type="text" placeholder="Enter your name" bind:value={name} />
  <button on:click={handlesub}>Submit</button>
  {#if greeting}
    <p>{greeting}</p>
  {/if}
</div>

<p>{message}</p>
