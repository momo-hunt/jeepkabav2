<script>
  import CoSpin from "$lib/ui/component/co-spin.svelte";
  import CoModal from "$lib/ui/component/co-modal.svelte";
  import CoForm from "$lib/ui/component/co-form.svelte";
  import { formatInputDate, formatInputTime } from "$lib/util/date-time";

  export let title,
    action,
    kendaraan = {},
    sopir = {},
    karyawan = {},
    collection,
    spj = {},
    open = false;
</script>

<CoForm {action} {title} on:process={() => (open = false)} on:submit>
  <input type="hidden" name="collection" value={collection} />
  {#if spj?.["id"]}
    <input type="hidden" name="id" value={spj?.["id"]} />
  {/if}

  <CoModal {title} {open}>
    <div class="form">
      <div class="col">
        <label for="no_spj">No SPJ</label>
        <input
          type="text"
          name="no_spj"
          id="no_spj"
          value={spj?.["no_spj"] ?? ""}
        />
      </div>

      <div class="col">
        <label for="karyawan_id">Kepada</label>
        {#if karyawan?.loading}
          <CoSpin />
        {:else if karyawan?.data}
          <select
            name="karyawan_id"
            id="karyawan_id"
            value={spj?.["karyawan_id"] ??
              "b7085af5-3511-4930-8d45-27f644a6f3a4"}
          >
            {#each karyawan?.data as { id, nama }}
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
          value={spj?.["tujuan"] ?? ""}
        />
      </div>

      <div class="col">
        <label for="keperluan">Keperluan</label>
        <input
          type="text"
          name="keperluan"
          id="keperluan"
          value={spj?.["keperluan"] ?? ""}
        />
      </div>

      <div class="row">
        <div class="col">
          <label for="tanggal_berangkat">Tanggal Berangkat</label>
          <input
            type="date"
            name="tanggal_berangkat"
            id="tanggal_berangkat"
            value={formatInputDate(spj?.["tanggal_berangkat"])}
          />
        </div>
        <div class="col">
          <label for="jam_berangkat">Jam</label>
          <input
            type="time"
            name="jam_berangkat"
            id="jam_berangkat"
            value={formatInputTime(spj?.["jam_berangkat"])}
          />
        </div>
      </div>

      <div class="col">
        <label for="sopir_id">Sopir</label>
        {#if sopir?.loading}
          <CoSpin />
        {:else if sopir?.data}
          <select
            name="sopir_id"
            id="sopir_id"
            value={spj?.["sopir_id"] ?? "b7085af5-3511-4930-8d45-27f644a6f3a4"}
          >
            {#each sopir?.data as { id, nama }}
              <option value={id}>{nama}</option>
            {/each}
          </select>
        {/if}
      </div>

      <div class="col">
        <label for="kendaraan_id">Kendaraan</label>
        {#if kendaraan?.loading}
          <CoSpin />
        {:else if kendaraan?.data}
          <select
            name="kendaraan_id"
            id="kendaraan_id"
            value={spj?.["kendaraan_id"] ??
              "25485499-264e-4435-b30b-a5709db7be54"}
          >
            {#each kendaraan?.data as { id, nama }}
              <option value={id}>{nama}</option>
            {/each}
          </select>
        {/if}
      </div>
    </div>
    <svelte:fragment slot="footer">
      <button type="submit">Simpan</button>
      <button type="button" on:click={() => (open = false)}>Batal</button>
    </svelte:fragment>
  </CoModal>
</CoForm>

<style>
  .form {
    padding: 1rem;
  }

  .form > * {
    margin-bottom: 1rem;
  }

  .row {
    display: flex;
    gap: 1rem;
  }
</style>
