<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import {page} from '$app/stores';
  let message = '';
  let greeting = '';
  export let JournalId = $page.params.journalID || 'default';
  let datetime = new Date();
  let dateElement;

  let userInput = '';


  onMount(async () => {
    try {
      // const res = await fetch(`/journal/${JournalId}`);
      // const data = await res.json();
      // message = data.message || data.error || 'No message received.';
    } catch (err) {
      console.error(err);
    }
  });

  async function createEntry() {
    if (!userInput) {
      greeting = 'Please enter a journal topic';
      return;
    }
    // Redirect to new journal page with user's topic as ID
    goto(`/journal/${encodeURIComponent(userInput)}`);
  }

</script>

<h1>Journaling List </h1>

<form method="post" on:submit|preventDefault={createEntry}>
  <input 
    type="text" 
    placeholder="Enter journal topic (e.g. 'work stress')" 
    bind:value={userInput}
  />
  <button type="submit">Create Journal</button>
</form>

<h1>Journal {JournalId} details</h1>

<p>{message}</p>
<style>
  .entry {
    margin-bottom: 1em;
  }
  input {
    margin-right: 0.5em;
  }
  button {
    margin-left: 0.5em;
  }
</style>
