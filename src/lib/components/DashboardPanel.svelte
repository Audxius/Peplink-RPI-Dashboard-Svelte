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
    <button type="button" class="button button-strong panel" onclick={toggleTheme}>
      Switch theme
    </button>

    <button type="button" class="button button-strong panel" onclick={logout}> Logout </button>
  </div>
</div>
