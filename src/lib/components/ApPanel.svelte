<script>
  export let apState = null;
  export let Toggle = async () => {};
</script>

<div class="panel">
  <h2>AP</h2>
  <button class="button" class:on={apState} class:off={!apState} onclick={Toggle}>
    {apState ? 'ON' : 'OFF'}
  </button>
</div>
