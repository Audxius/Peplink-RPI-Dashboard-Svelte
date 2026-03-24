<script lang="ts">
  import type { WanAllowance } from '$lib/polling/polling';

  export let wanAllowances: WanAllowance[] = [];
</script>

<div class="panel">
  <h2>WAN allowance</h2>
  {#if wanAllowances.length === 0}
    <div>No WAN allowance data</div>
  {:else}
    <table class="clients-table">
      <thead>
        <tr>
          <th>WAN</th>
          <th>Allowance</th>
          <th>Target</th>
        </tr>
      </thead>
      <tbody>
        {#each wanAllowances as allowance}
          <tr>
            <td>{allowance.wanName}</td>
            <td>
              <div class="pill" class:on={allowance.enabled} class:off={!allowance.enabled}>
                {allowance.enabled ? 'enabled' : 'disabled'}
              </div>
            </td>
            <td>{allowance.target}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
