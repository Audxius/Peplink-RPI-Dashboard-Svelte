<script lang="ts">
  type Wan = {
    name?: string | null;
    status?: string | null;
    ip?: string | null;
    type?: string | null;
    uptime?: number | string | null;
  };

  type WanStatus = 'connected' | 'disabled' | 'pending';

  export let wanConnections: Wan[] = [];
  export let getWanStatusKind: (wan: Wan) => WanStatus = () => 'pending';

  const formatUptime = (value: Wan['uptime']): string => {
    const sec = Number(value) || 0;
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };
</script>

<div class="panel">
  <h2>WAN</h2>

  {#if !wanConnections.length}
    <div>No WAN connections</div>
  {:else}
    <table class="clients-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>IP</th>
          <th>Type</th>
          <th>Uptime (s)</th>
        </tr>
      </thead>
      <tbody>
        {#each wanConnections as wan}
          {@const statusKind = getWanStatusKind(wan)}
          <tr>
            <td>{wan.name ?? '-'}</td>
            <td>
              <div
                class="pill"
                class:on={statusKind === 'connected'}
                class:off={statusKind === 'disabled'}
                class:pending={statusKind === 'pending'}
              >
                {wan.status ?? '-'}
              </div>
            </td>
            <td>{wan.ip ?? '-'}</td>
            <td>{wan.type ?? '-'}</td>
            <td>{formatUptime(wan.uptime)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
