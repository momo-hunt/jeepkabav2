<script>
  import { toast } from "$lib/stores";
  import { fly, fade } from "svelte/transition";
  import CoSpin from "./co-spin.svelte";

  // $: if ($toast.length > 0) console.log("toast", $toast);
</script>

{#if $toast.length}
  <section>
    {#each $toast as { type, text }, i}
      {#key i}
        <article class={type} in:fly={{ y: -100, delay: 500 * i }} out:fade>
          {#if type == "process"}
            <CoSpin />
          {/if}
          {text}
        </article>
      {/key}
    {/each}
  </section>
{/if}

<style>
  section {
    position: fixed;
    top: 0;
    width: fit-content;
    left: 50%;
    transform: translateX(-50%);
  }

  article {
    margin: 0.5rem auto;
    width: fit-content;
    padding: 0.25rem 1rem;
    background-color: white;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: var(--radius);
    display: flex;
    gap: 0.5rem;
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
