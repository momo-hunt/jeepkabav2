import { db } from "$lib/server";

export const handle = async ({ event, resolve }) => {
  event.locals.db = db;
  let token = "be4f6730-b6b5-44e7-9b14-9aec786e5a0c";
  event.locals.db.setToken(token);

  const response = await resolve(event);
  return response;
};
