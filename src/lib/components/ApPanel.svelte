<script>
  /** @type {boolean | null} */
  export let apState = null;

  /** @type {() => Promise<void>} */
  export let Toggle = async () => {};
</script>

<div class="panel">
  <h2>AP</h2>
  <button class="button" class:on={apState} class:off={!apState} onclick={Toggle}>
    {apState ? 'ON' : 'OFF'}
  </button>
</div>
