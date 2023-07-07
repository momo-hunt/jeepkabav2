<script>
  import CoHeader from "$lib/ui/component/co-header.svelte";
  import UiListSpj from "./ui-list-spj.svelte";
  import { toggle, obj, list } from "$lib/stores";
  import { onMount } from "svelte";
  import UiModalTambah from "./ui-modal-tambah.svelte";
  import UiAction from "./ui-action.svelte";
  import UiConfirmDelete from "./ui-confirm-delete.svelte";

  let collection = "spj";
  let editValue;

  let modal = {
    open: false,
    action: "add",
    title: "Tambah SPJ",
  };

  let confirm = { open: false };

  function openModal(mode) {
    modal.open = true;
    list.get("sopir", { select: ["id", "nama"] });
    list.get("kendaraan", { select: ["id", "nama"] });
    list.get("karyawan", { select: ["id", "nama"] });
    if (mode == "edit") {
      modal.action = "edit";
      modal.title = "Ubah SPJ";
    }
  }

  function confirmDelete() {
    if (!editValue) return;
    confirm = { open: true, id: editValue?.id };
  }

  function handleSubmit(e) {
    const { error, data, action } = e.detail;
    if (!error) {
      if (action == "add") {
        list.add(collection, data);
      } else if (action == "edit") {
        const { id, ...rest } = data;
        list.edit(collection, id, rest);
      } else if (action == "delete") {
        list.delete(collection, data);
      }
    }
  }

  onMount(() => {
    list.get(collection);
  });

  // $: console.log("list : ", $list);

  // $: console.log("edit", editValue);
</script>

<CoHeader title="SPJ" />

<button type="button" on:click={() => openModal("add")}>Tambah</button>

<UiListSpj spj={$list?.[collection]} bind:editValue />

<UiModalTambah
  action={modal?.action}
  title={modal?.title}
  spj={editValue}
  bind:open={modal.open}
  kendaraan={$list?.kendaraan}
  sopir={$list?.sopir}
  karyawan={$list?.karyawan}
  {collection}
  on:submit={handleSubmit}
/>

<UiAction open={editValue} {openModal} {confirmDelete} />

<UiConfirmDelete
  id={confirm?.id}
  bind:open={confirm.open}
  on:submit={handleSubmit}
  {collection}
/>
