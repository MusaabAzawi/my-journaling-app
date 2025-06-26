<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p><a href="/journal">Check out the tutorial</a> to learn how to build SvelteKit apps</p>
<div class="entry">
    <input type="text" placeholder="Enter your name" bind:value={name} />
    <button on:click={handleClick}>Submit</button>
    {#if greeting}
        <p>{greeting}</p>
    {/if}
    <h1>Journaling List</h1>
    {#each data.journals as journal}
        <div>
            <a href={`/journal/${journalID.id}`}>
                {journal.title}
        </div>
    {/each}
    <ul>

    </ul>
</div>
<script lang="ts">
    export let data;
    let name = '';
    let greeting = '';

    function handleClick() {
        if (name) {
            greeting = `Hello, ${name}!`;
        } else {
            greeting = 'Please enter your name.';
        }
    }
</script>