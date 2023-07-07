<script>
  export let open = false;
</script>

{#if open}
  <section>
    <article>
      <slot />
    </article>
  </section>
{/if}

<style>
  section {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }

  article {
    background-color: var(--white);
    width: 90%;
    margin: 2rem auto;
    padding: 1rem;
    border-radius: var(--radius);
    border: var(--border);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  }
</style>
