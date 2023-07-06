<script>
  import CoHeader from "$lib/ui/component/co-header.svelte";
  import UiListSpj from "./ui-list-spj.svelte";
  import { toggle, obj, list } from "$lib/stores";
  import { onMount } from "svelte";
  import UiModalTambah from "./ui-modal-tambah.svelte";

  let collection = "spj";
  let isOpenModalTambah = false;

  function openTambah() {
    isOpenModalTambah = true;
    list.get("sopir", { select: ["id", "nama"] });
    list.get("kendaraan", { select: ["id", "nama"] });
    list.get("karyawan", { select: ["id", "nama"] });
  }

  function handleSubmitTambah(e) {
    if (!e.detail.error) list.add(collection, e.detail.data);
  }

  onMount(() => {
    list.get(collection);
  });

  $: console.log("list : ", $list);
</script>

<CoHeader title="SPJ" />

<button type="button" on:click={openTambah}>Tambah</button>

<UiListSpj spj={$list?.[collection]} />

<UiModalTambah
  bind:open={isOpenModalTambah}
  kendaraan={$list?.kendaraan}
  sopir={$list?.sopir}
  karyawan={$list?.karyawan}
  {collection}
  on:submit={handleSubmitTambah}
/>
