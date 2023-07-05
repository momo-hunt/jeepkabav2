<script>
  export let open = false,
    title = "";
</script>

{#if open}
  <section>
    <article>
      <header>
        <h2>{title}</h2>
      </header>

      <slot />

      <footer>
        <slot name="footer" />
      </footer>
    </article>
  </section>
{/if}

<style>
  section {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }

  article {
    background-color: var(--light);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 90%;
    border-radius: 2rem 2rem 0 0;
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
  }

  header {
    text-align: center;
  }

  footer {
    display: flex;
    gap: 1rem;
    margin: 0 1rem;
    justify-content: end;
  }
</style>
