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
    toast.process("form" + action, `${title}`);
    dispatch("process");

    return async ({ result }) => {
      console.log("result form : ", action, result.type, result.data);
      dispatch("submit", {
        error: result.type != "success",
        data: result.data,
        action,
      });
      if (result.type == "success")
        return toast.success("form" + action, `${title}`);
      toast.error("form" + action, `${title}`);
    };
  }}
>
  <slot />
</form>
