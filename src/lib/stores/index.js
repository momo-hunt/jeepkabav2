import { writable } from "svelte/store";

// toggle
const toastStore = () => {
  const { subscribe, set, update } = writable([]);
  let old = [];
  let processId;
  return {
    subscribe,
    process: (text) => {
      const id = crypto.randomUUID();
      processId = id;
      old = [...old, { id, type: "process", text }];
      set(old);
    },

    error: (text) => {
      if (processId) old = old.filter((o) => o.id != processId);

      const id = crypto.randomUUID();
      old = [...old, { id, type: "danger", text }];
      set(old);

      setTimeout(() => {
        set(() => {
          old.filter((o) => o.id != id);
        });
      }, 4000);
    },

    success: (text) => {
      if (processId) old = old.filter((o) => o.id != processId);

      const id = crypto.randomUUID();
      old = [...old, { id, type: "success", text }];
      set(old);

      setTimeout(() => {
        set(() => {
          old.filter((o) => o.id != id);
        });
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

      old = { ...old, [collection]: { loading: false, ...result } };
      set(old);
    },
  };
};
export const list = listStore();
