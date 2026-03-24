<script lang="ts">
  import type { RouterClient } from '$lib/polling/polling';

  export let clients: RouterClient[] = [];
</script>

<div class="panel">
  <h2>Clients</h2>

  {#if !clients.length}
    <div>Searching for clients...</div>
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
            <td>{client.name || 'Unknown'}</td>
            <td>
              <div class="pill" class:on={client.active} class:off={!client.active}>
                {client.active ? 'online' : 'offline'}
              </div>
            </td>
            <td>{client.ip || '-'}</td>
            <td>{client.connectionType || '-'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
