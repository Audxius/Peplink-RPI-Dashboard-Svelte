<script>
  import { goto } from '$app/navigation';
</script>

<div class="header">
  <h1>Dashboards</h1>
  <div class="actions">
    <button type="button" class="button button-strong panel" onclick={() => alert('Not done')}
      >Switch Theme</button
    >
    <button type="button" class="button button-strong panel" onclick={() => goto('/login')}>
      Logout
    </button>
  </div>
</div>
