import { fail } from "@sveltejs/kit";

export const actions = {
  add: async ({ locals, request }) => {
    const { collection, ...data } = Object.fromEntries(
      await request.formData()
    );

    try {
      const result = await locals.db.collection(collection).create(data);
      return result;
    } catch (error) {
      return fail(400, error.message);
    }
  },

  edit: async ({ locals, request }) => {
    const { collection, id, ...data } = Object.fromEntries(
      await request.formData()
    );

    try {
      const result = await locals.db.collection(collection).update(id, data);
      return result;
    } catch (error) {
      return fail(400, { ...error, message: error.message });
    }
  },

  delete: async ({ locals, request }) => {
    const { collection, id } = Object.fromEntries(await request.formData());

    try {
      const result = await locals.db.collection(collection).delete(id);
      return result;
    } catch (error) {
      return fail(400, { ...error, message: error.message });
    }
  },
};
