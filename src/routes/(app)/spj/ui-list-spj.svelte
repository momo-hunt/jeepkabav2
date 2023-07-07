<script>
  import CoSpin from "$lib/ui/component/co-spin.svelte";
  import { longAgo, getPartDateTime } from "$lib/util/date-time";

  export let spj, editValue;
</script>

{#if spj?.loading}
  <CoSpin size="24" />
{/if}

{#if spj?.data}
  <ul>
    {#each spj?.data as d}
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li class="row" tabindex="0" on:click={() => (editValue = d)}>
        <div>
          {getPartDateTime(d?.tanggal_berangkat)?.month ?? ""} <br />
          <h2>{getPartDateTime(d?.tanggal_berangkat)?.day ?? ""}</h2>
        </div>
        <div>
          <h3>Nomor : {d?.no_spj}</h3>
          <p>{d?.keperluan} ({d?.tujuan})</p>
          <small>{d?.created?.name} - {longAgo(d?.created?.at)}</small>
        </div>
      </li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    padding: 1rem 0;
    flex: 1;
  }

  ul li {
    background-color: var(--white);
    padding: 0.5rem 1rem;
    border-bottom: var(--border);
  }

  ul li:hover,
  ul li:focus {
    background-color: var(--bg-2);
  }

  .row {
    display: flex;
    gap: 1rem;
  }

  .row > *:first-child {
    text-align: right;
    opacity: 0.8;
  }

  small {
    opacity: 0.7;
  }
</style>
