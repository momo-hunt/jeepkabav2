<script>
  import { onMount } from "svelte";
  import { toggle, obj, list } from "$lib/stores";
  import CoModal from "$lib/ui/component/co-modal.svelte";
  import CoSpin from "$lib/ui/component/co-spin.svelte";

  let selectted = null;
  onMount(() => {
    list.get("spj", { filter: { pemakaian_id: null } });
  });
</script>

<CoModal open={$toggle?.["pilih-spj"]?.open} title="Pilih SPJ">
  {#if $list?.spj?.loading}
    <CoSpin size="24" />
  {/if}

  <ul>
    {#if $list?.spj?.data}
      {#each $list?.spj?.data as d}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <li
          on:click={() => (selectted = d)}
          tabindex="0"
          class:active={selectted?.id == d?.id}
        >
          <h3>{d?.no_spj}</h3>
        </li>
      {/each}
    {/if}
  </ul>

  <svelte:fragment slot="footer">
    <button
      type="button"
      on:click={() => {
        toggle.close("pilih-spj", false);
        obj.set("spj", selectted);
      }}>Pilih</button
    >
    <button type="button" on:click={() => toggle.close("pilih-spj")}
      >Batal</button
    >
  </svelte:fragment>
</CoModal>

<style>
  ul {
    padding: 1rem 0;
    flex: 1;
  }

  ul li {
    padding: 0.5rem 1rem;
    border-bottom: var(--border);
  }

  ul li:hover,
  ul li:focus,
  ul li.active {
    background-color: var(--bg-2);
  }
</style>
