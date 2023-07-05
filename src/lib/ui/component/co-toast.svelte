<script>
  import { toast } from "$lib/stores";
  import { fly } from "svelte/transition";
</script>

{#if $toast.length}
  <section>
    {#each $toast as { type, text }, i}
      {#key i}
        <article class={type} in:fly={{ y: -100 }} out:fly={{ y: -100 }}>
          {text}
        </article>
      {/key}
    {/each}
  </section>
{/if}

<style>
  section {
    position: fixed;
    inset: auto 0;
    top: 0;
  }

  article {
    margin: 1rem auto;
    width: fit-content;
    padding: 0.25rem 1rem;
    background-color: white;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  }

  article.danger {
    color: white;
    background-color: red;
  }

  article.success {
    color: white;
    background-color: green;
  }
</style>
