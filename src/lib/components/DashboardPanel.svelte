<script lang="ts">
  import { onMount } from 'svelte';
  import { toggleTheme, restoreTheme, logout } from './DashboardPanelData';

  onMount(() => {
    restoreTheme();
  });
</script>

<div class="header">
  <h1>Dashboard</h1>

  <div class="actions">
    <button type="button" class="button button-strong panel" on:click={toggleTheme}>
      Switch theme
    </button>

    <button type="button" class="button button-strong panel" on:click={logout}> Logout </button>
  </div>
</div>
