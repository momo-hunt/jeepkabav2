import { json } from "@sveltejs/kit";

export const GET = async ({ locals, params, url }) => {
  let opt = url.searchParams.get("opt");
  if (opt) opt = JSON.parse(opt);

  const result = await locals.db.collection(params.collection).read(opt);
  return json(result);
};
