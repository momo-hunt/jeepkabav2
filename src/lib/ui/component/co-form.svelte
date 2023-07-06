<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { enhance } from "$app/forms";
  import { toast } from "$lib/stores";
  export let action, title;
</script>

<form
  action={`/?/${action}`}
  {title}
  method="post"
  use:enhance={({ submitter }) => {
    submitter.focus();
    toast.process(null, `${title}`);
    dispatch("process");

    return async ({ result }) => {
      console.log("result form : ", result.type, result.data);
      dispatch("submit", {
        error: result.type != "success",
        data: result.data,
      });
      if (result.type == "success") return toast.success(null, `${title}`);
    };
  }}
>
  <slot />
</form>
