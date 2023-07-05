<script>
  export let size = "18";
</script>

<div style="height: {size}px; border-width:calc({size}px / 6);">
  <div style="border-width:calc({size}px / 6); inset: calc({size}px / -6);" />
</div>

<style>
  div {
    position: relative;
    aspect-ratio: 1/1;
    border: solid hsl(0, 0%, 80%);
    border-radius: 50%;
    margin: auto;
  }

  div > div {
    content: "";
    position: absolute;
    border: solid blue;
    border-color: hsl(0, 0%, 50%) transparent transparent transparent;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
</style>
