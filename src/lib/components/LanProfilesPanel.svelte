<script>
  export let lanProfiles = [];
</script>

<div class="panel">
  <h2>LAN profiles</h2>
  {#if lanProfiles.length === 0}
    <div>No LAN profiles</div>
  {:else}
    <table class="clients-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>IP</th>
          <th>Mask</th>
        </tr>
      </thead>
      <tbody>
        {#each lanProfiles as profile}
          <tr>
            <td>{profile.id}</td>
            <td>{profile.ip}</td>
            <td>{profile.mask}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
