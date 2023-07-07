<script>
  import ElIcon from "$lib/ui/element/el-icon.svelte";
  import { fly } from "svelte/transition";

  export let open, openModal, confirmDelete;
</script>

{#if open}
  <section>
    <article transition:fly={{ x: 100 }}>
      <button class="close" on:click={() => (open = false)}>
        <ElIcon name="close" />
      </button>
      <nav>
        <h3>Action</h3>
        <button
          type="button"
          role="link"
          on:click={() => {
            open = false;
            openModal("edit");
          }}><ElIcon name="edit_square" /> Ubah</button
        >
        <button
          type="button"
          role="link"
          on:click={() => {
            open = false;
            confirmDelete();
          }}><ElIcon name="delete" /> Hapus</button
        >
      </nav>
    </article>
  </section>
{/if}

<style>
  section {
    position: relative;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }

  article {
    margin-left: auto;
    width: 60%;
    height: 100%;
    background-color: var(--bg-1);
  }

  nav {
    display: flex;
    flex-direction: column;
  }

  nav h3 {
    padding: 1rem;
  }

  button[role="link"] {
    border: none;
    background-color: var(--white);
    display: block;
    text-align: left;
    padding: 1rem;
    border-bottom: 1px solid var(--bg-1);
  }

  button[role="link"]:hover {
    filter: brightness(0.9);
  }

  button.close {
    border: none;
    width: 2rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    position: absolute;
    top: 4px;
    right: 4px;
    color: red;
  }
</style>
