<script>
  export let apState = null;
  export let Toggle = async () => {};
</script>

<div class="panel">
  <h2>Access Point</h2>
  <button class="button small-padding" class:on={apState} class:off={!apState} onclick={Toggle}>
    {apState ? 'ON' : 'OFF'}
  </button>
</div>
