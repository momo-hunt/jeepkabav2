<script>
  import UiListPemakaian from "./ui-list-pemakaian.svelte";
  import { onMount } from "svelte";
  import { list } from "$lib/stores";
  import CoHeader from "../../../lib/ui/component/co-header.svelte";

  let collection = "pemakaian";

  onMount(() => {
    list.get(collection, { limit: 20 });
  });
</script>

<CoHeader title="Pemakaian" />

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
