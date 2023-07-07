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

      <main>
        <slot />
      </main>

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
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.2);
  }

  article {
    background-color: var(--white);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 90%;
    border-radius: 2rem 2rem 0 0;
    display: flex;
    flex-direction: column;
  }

  main {
    overflow-y: auto;
    flex: 1;
  }

  header {
    text-align: center;
    padding: 1rem 0;
  }

  footer {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    margin: 0 1rem;
    justify-content: end;
    border-top: var(--border);
  }
</style>
