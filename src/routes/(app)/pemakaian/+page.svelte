<script>
  import ElIcon from "$lib/ui/element/el-icon.svelte";

  import UiListPemakaian from "./ui-list-pemakaian.svelte";
  import { onMount } from "svelte";
  import { list } from "$lib/stores";

  let collection = "pemakaian";

  onMount(() => {
    list.get(collection, { limit: 20 });
  });
</script>

<header>
  <a href="./">
    <ElIcon name="arrow_back" /> Back
  </a>
</header>

<h2>Pemakaian</h2>

<a href="/pemakaian/tambah" role="button">Tambah</a>

<UiListPemakaian
  loading={$list?.[collection]?.loading}
  data={$list?.[collection]?.data}
/>

<style>
  h2 {
    padding: 1rem 0;
    margin: 0 1rem;
  }
</style>
