<script>
  import { onMount } from "svelte";
  import { toggle, obj, list } from "$lib/stores";
  import CoSpin from "$lib/ui/component/co-spin.svelte";
  import CoForm from "$lib/ui/component/co-form.svelte";
  import { goto } from "$app/navigation";
  import { formatInputDate, formatInputTime } from "$lib/util/date-time";

  function onSubmit(e) {
    if (!e.detail.error) goto("./");
  }

  $: km_awal = $list?.rekap?.data?.[0]?.km_terakhir ?? 0;
  let km_akhir;
  $: km_nilai = km_akhir <= 0 ? 0 : km_akhir - km_awal;

  onMount(() => {
    list.get("sopir", { select: ["id", "nama"] });
    list.get("kendaraan", { select: ["id", "nama"] });
    list.get("rekap");
  });

  // $: console.log("toggle : ", $toggle);
  // $: console.log("list : ", $list);
  // $: console.log("obj : ", $obj);
</script>

<CoForm action="add" title="Tambah pemakaian baru." on:submit={onSubmit}>
  <input type="hidden" name="collection" value="pemakaian" />
  <input type="hidden" name="spj_id" value={$obj?.spj?.["id"] ?? ""} />

  <section class="form">
    <div class="col">
      <label for="no_spj">No SPJ</label>
      <input
        type="text"
        name="no_spj"
        id="no_spj"
        value={$obj?.spj?.["no_spj"] ?? ""}
        on:click={() => toggle.open("pilih-spj")}
        placeholder="Pilih SPJ"
      />
    </div>

    <div class="col">
      <label for="sopir_id">Sopir</label>
      {#if $list?.sopir?.loading}
        <CoSpin />
      {:else if $list?.sopir?.data}
        <select
          name="sopir_id"
          id="sopir_id"
          value={$obj?.spj?.["sopir_id"] ??
            "b7085af5-3511-4930-8d45-27f644a6f3a4"}
        >
          {#each $list?.sopir?.data as { id, nama }}
            <option value={id}>{nama}</option>
          {/each}
        </select>
      {/if}
    </div>

    <div class="col">
      <label for="kendaraan_id">Kendaraan</label>
      {#if $list?.kendaraan?.loading}
        <CoSpin />
      {:else if $list?.kendaraan?.data}
        <select
          name="kendaraan_id"
          id="kendaraan_id"
          value={$obj?.spj?.["kendaraan_id"] ??
            "25485499-264e-4435-b30b-a5709db7be54"}
        >
          {#each $list?.kendaraan?.data as { id, nama }}
            <option value={id}>{nama}</option>
          {/each}
        </select>
      {/if}
    </div>

    <div class="col">
      <label for="tujuan">Tujuan</label>
      <input
        type="text"
        name="tujuan"
        id="tujuan"
        value={$obj?.spj?.["tujuan"] ?? ""}
        placeholder="Tempat tujuan"
      />
    </div>

    <div class="col">
      <label for="keperluan">Keperluan</label>
      <input
        type="text"
        name="keperluan"
        id="keperluan"
        value={$obj?.spj?.["keperluan"] ?? ""}
        placeholder="Dinas atau antar.."
      />
    </div>

    <p>Berangkat</p>
    <div class="row">
      <div class="col">
        <label for="tanggal_berangkat">Tanggal</label>
        <input
          type="date"
          name="tanggal_berangkat"
          id="tanggal_berangkat"
          value={formatInputDate($obj?.spj?.["tanggal_berangkat"])}
        />
      </div>
      <div class="col">
        <label for="jam_berangkat">Jam</label>
        <input
          type="time"
          name="jam_berangkat"
          id="jam_berangkat"
          value={formatInputTime($obj?.spj?.["jam_berangkat"])}
        />
      </div>
    </div>

    <p>Kembali</p>
    <div class="row">
      <div class="col">
        <label for="tanggal_kembali">Tanggal</label>
        <input
          type="date"
          name="tanggal_kembali"
          id="tanggal_kembali"
          value={formatInputDate($obj?.spj?.["tanggal_kembali"])}
        />
      </div>
      <div class="col">
        <label for="jam_kembali">Jam</label>
        <input
          type="time"
          name="jam_kembali"
          id="jam_kembali"
          value={formatInputTime($obj?.spj?.["jam_kembali"])}
        />
      </div>
    </div>

    <p>Kilometer</p>
    <div class="row">
      <div class="col col-4">
        <label for="km_awal">Awal</label>
        <input
          type="number"
          name="km_awal"
          id="km_awal"
          bind:value={km_awal}
          readonly
        />
      </div>
      <div class="col col-4">
        <label for="km_akhir">Akhir</label>
        <input
          type="number"
          name="km_akhir"
          id="km_akhir"
          bind:value={km_akhir}
          min="1"
        />
      </div>
      <div class="col col-2">
        <label for="km_pemakaian">Nilai</label>
        <input
          type="number"
          name="km_pemakaian"
          id="km_pemakaian"
          value={km_nilai}
          readonly
        />
      </div>
    </div>

    <button type="submit">Tambah</button>
  </section>
</CoForm>

<style>
  section,
  .col {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  section {
    gap: 1rem;
    padding: 1rem;
    background-color: var(--white);
  }

  .col.col-4 {
    flex: none;
    width: 35%;
  }

  .col.col-2 {
    flex: 1;
  }

  .row {
    display: flex;
    gap: 1rem;
  }

  section > p {
    margin-bottom: -1rem;
  }
</style>
