<script lang="ts">
let {data} = $props();
let {message} = data;

$inspect(data)
</script>

<div>
  {#if message}
    <p>{message}</p>
  {:else}
    <p>Error generating message</p>
  {/if}
</div>
