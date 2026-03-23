<script lang="ts">
  export let apState: boolean | null = null;
  export let Toggle: () => Promise<void> = async () => {};
</script>

<div class="panel">
  <h2>Access Point</h2>
  <button class="button small-padding" class:on={apState} class:off={!apState} onclick={Toggle}>
    {apState ? 'ON' : 'OFF'}
  </button>
</div>
