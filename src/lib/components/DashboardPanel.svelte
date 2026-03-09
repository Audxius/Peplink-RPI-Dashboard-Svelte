<script>
  import { goto } from '$app/navigation';
</script>

<div class="header">
  <h1>Dashboard</h1>
  <div class="actions">
    <button style="font-weight:bold;" type="button" class="button panel" onclick={() => alert('Not done')}
      >Switch Theme</button
    >
    <button
      style="font-weight:bold;"
      type="button"
      class="button panel"
      onclick={() => goto('/login')}
    >
      Logout
    </button>
  </div>
</div>
