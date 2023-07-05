<script>
  import ElIcon from "$lib/ui/element/el-icon.svelte";
  import UiFormTambah from "./ui-form-tambah.svelte";
  import UiModalPilihSpj from "./ui-modal-pilih-spj.svelte";
</script>

<header>
  <a href="./">
    <ElIcon name="arrow_back" /> Back
  </a>
</header>

<h2>Tambah Pemakaian</h2>

<UiFormTambah />

<UiModalPilihSpj />

<style>
  h2 {
    padding: 1rem 0;
    margin: 0 1rem;
  }
</style>
