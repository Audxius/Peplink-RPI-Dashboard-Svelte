<script>
  export let clients = [];
  export let isClientOnline = (client) => {};
  export let getClientStateLabel = (client) => {};
</script>

<div class="panel">
  <h2>Clients</h2>
  {#if clients.length === 0}
    <div>No clients connected</div>
  {:else}
    <table class="clients-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>State</th>
          <th>IP</th>
          <th>Conn</th>
        </tr>
      </thead>
      <tbody>
        {#each clients as client}
          <tr>
            <td>{client.name ?? 'Unknown'}</td>
            <td
              ><div
                class="pill"
                class:on={isClientOnline(client)}
                class:off={!isClientOnline(client)}
              >
                {getClientStateLabel(client)}
              </div></td
            >
            <td>{client.ip ?? '-'}</td>
            <td>{client.connectionType ?? '-'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
