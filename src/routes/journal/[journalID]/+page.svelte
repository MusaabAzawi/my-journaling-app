<script lang="ts">
  export let data: { message: string };
  let { message } = data;
  let userInput = '';
  let greeting = '';

  async function createEntry() {
    if (!userInput) {
      greeting = 'Please enter a journal topic';
      return;
    }
  }
</script>

<div>
  {#if message}
    <h1>Journal Entries</h1>
    <p>{message}</p>
  {:else}
    <p>Error generating message</p>
  {/if}
</div>

<form method="post" on:submit|preventDefault={createEntry}>
  <input 
    type="text" 
    placeholder="Go Deeper , send question (e.g. 'work stress')" 
    bind:value={userInput}
  />
  <button type="submit">Create Journal</button>
</form>