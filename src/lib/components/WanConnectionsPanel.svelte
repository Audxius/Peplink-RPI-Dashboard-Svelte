<script>
  export let wanConnections = [];
  export let getWanStatusKind = (_wan) => 'pending';

  //format seconds into hours and minutes and seconds
  const formatUptime = (totalSeconds) => {
    const sec = Number(totalSeconds) || 0;
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    const pad = (n) => String(n).padStart(2, '0');
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  };
</script>

<div class="panel">
  <h2>WAN</h2>
  {#if wanConnections.length === 0}
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
          <tr>
            <td>{wan.name}</td>
            <td>
              <div
                class="pill"
                class:on={getWanStatusKind(wan) === 'connected'}
                class:off={getWanStatusKind(wan) === 'disabled'}
                class:pending={getWanStatusKind(wan) === 'pending'}
              >
                {wan.status}
              </div>
            </td>
            <td>{wan.ip}</td>
            <td>{wan.type}</td>
            <td>{formatUptime(wan.uptime)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
