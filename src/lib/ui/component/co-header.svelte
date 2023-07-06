<script>
  import ElIcon from "$lib/ui/element/el-icon.svelte";

  export let title = "";
</script>

<header>
  <a href="./">
    <ElIcon name="arrow_back" />
    <h3>Jeep Kaba</h3>
  </a>
</header>

<h2>{title}</h2>

<style>
  header {
    background-color: var(--bg-5);
    color: var(--white);
    height: 2.5rem;
    display: flex;
    align-items: center;
  }

  header a {
    padding: 0 0.5rem;
    color: inherit;
  }

  h2 {
    padding: 1rem;
  }
</style>
