<script>
  import { onMount } from 'svelte';
  let message = '';
  let name = '';
  let greeting = '';
  let prompt = $props();

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

  async function handlePrompt() {
    console.log('Prompt:', prompt);
    try {
      const encodedPrompt = encodeURIComponent(prompt);
      const res = await fetch(`/journal?prompt=${encodedPrompt}`);
      const data = await res.json();
      message = data.response || 'No response from AI.';
    } catch (err) {
      message = 'Error fetching AI response.';
      console.error(err);
    }
    if (!prompt) {
      message = 'Please enter a prompt.';
      return;
    }
    // Simulate an AI response
    message = `AI response to your prompt: "${prompt}"`;
  }
</script>

<h1>Journaling Page</h1>

<div class="entry">
  <input type="text" placeholder="Enter your name" bind:value={prompt} />
  <button onclick={handlesub}>Submit</button>
  {#if greeting}
    <p>{greeting}</p>
  {/if}
</div>

<div class="entry">
  <input type="text" placeholder="Ask about journaling..." bind:value={prompt} />
  <button onclick={handlePrompt}>Ask AI</button>
</div>

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
