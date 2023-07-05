<script>
  import CoSpin from "$lib/ui/component/co-spin.svelte";
  import { longAgo, getPartDateTime } from "$lib/util/date-time";

  export let data, loading;
</script>

{#if loading}
  <CoSpin size="24" />
{/if}

{#if data}
  <ul>
    {#each data as d}
      <li class="row">
        <div>
          {getPartDateTime(d?.tanggal_kembali)?.month ?? ""} <br />
          <h2>{getPartDateTime(d?.tanggal_kembali)?.day ?? ""}</h2>
        </div>
        <div>
          <h3>{d?.keperluan} ({d?.tujuan})</h3>
          <p>Kilometer {d?.km_pemakaian}</p>
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
