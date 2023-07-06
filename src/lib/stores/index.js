import { writable } from "svelte/store";

// toast
const toastStore = () => {
  const { subscribe, set, update } = writable([]);
  let old = [];
  return {
    subscribe,
    process: (cat, text) => {
      const id = crypto.randomUUID();
      old = [...old, { id, cat, type: "process", text }];
      set(old);
    },

    error: (cat, text) => {
      old = old.filter((o) => o.cat != cat);

      const id = crypto.randomUUID();
      text = "Gagal " + text + " !";
      old = [...old, { id, type: "danger", text }];
      set(old);

      setTimeout(() => {
        old = old.filter((o) => o.id != id);
        set(old);
      }, 4000);
    },

    success: (cat, text) => {
      old = old.filter((o) => o.cat != cat);

      const id = crypto.randomUUID();
      text = "Berhasil " + text + " !";
      old = [...old, { id, type: "success", text }];
      set(old);

      setTimeout(() => {
        old = old.filter((o) => o.id != id);
        set(old);
      }, 4000);
    },
  };
};
export const toast = toastStore();

// toggle
const toggleStore = () => {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    open: (name, data) => {
      return update((n) => ({ ...n, [name]: { open: true, data } }));
    },
    close: (name, data) => {
      return update((n) => ({ ...n, [name]: { open: false, data } }));
    },
  };
};
export const toggle = toggleStore();

// obj
const objStore = () => {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set: (name, data) => {
      return update((n) => ({ ...n, [name]: data }));
    },
  };
};
export const obj = objStore();

// list
const listStore = () => {
  const { subscribe, set, update } = writable({});
  let old = {};
  return {
    subscribe,
    get: async (collection, option) => {
      toast.process(collection, `Memuat ${collection}`);
      set({ ...old, [collection]: { loading: true } });

      const opt = option ? "opt=" + JSON.stringify(option) : "";
      const url = `/api/${collection}?${opt}`;

      const respon = await fetch(url, {
        method: "get",
        headers: {
          "X-ApiKey": "secret-api-key",
        },
      });
      const result = await respon.json();
      // console.log("result api : ", result);
      if (result.message && result.message == "fetch failed")
        toast.error("Anda sedang offline!");

      toast.success(collection, `memuat ${collection}`);
      old = { ...old, [collection]: { loading: false, ...result } };
      set(old);
      return old;
    },

    add: (collection, data) => {
      return update((n) => {
        n[collection].data = [data, ...n[collection].data];
        return n;
      });
    },
  };
};
export const list = listStore();
