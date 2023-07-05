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
};
