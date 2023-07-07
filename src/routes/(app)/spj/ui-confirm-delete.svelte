<script>
  import CoConfirm from "$lib/ui/component/co-confirm.svelte";
  import CoForm from "$lib/ui/component/co-form.svelte";
  export let id, open, collection;
</script>

<CoConfirm {open}>
  <section>
    <h2>Apakah yakin menghapus ?</h2>
    <CoForm
      action="delete"
      title="Hapus SPJ"
      on:process={() => (open = false)}
      on:submit
    >
      <input type="hidden" name="collection" value={collection} />
      <input type="hidden" name="id" value={id} />
      <button type="submit">Ya</button>
      <button type="button" on:click={() => (open = false)}>Tidak</button>
    </CoForm>
  </section>
</CoConfirm>

<style>
  section {
    text-align: center;
  }

  section h2 {
    margin-bottom: 2rem;
  }
</style>
