<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { startRestartWatcher } from './restarting';

  onMount(() => {
    return startRestartWatcher(() => goto('/login'));
  });
</script>

<div class="login-page">
  <div class="login-container">
    <div class="panel padding">
      <div class="welcome">Router restarting...</div>
      <div>You'll be redirected when the router is back online.</div>
    </div>
  </div>
</div>
