<script>
  import { goto } from '$app/navigation';
  import { authenticate as runAuthenticate, username, password, error, showError } from './login';

  const handleAuthenticate = async () => {
    await runAuthenticate(() => goto('/'));
  };
</script>

<div class="login-page">
  <div class="login-container">
    <div class="panel padding">
      <div class="welcome">Welcome</div>
      <form class="login-form" on:submit|preventDefault={handleAuthenticate}>
        <input
          class="auth-control"
          type="text"
          placeholder="Username"
          bind:value={$username}
          required
        />
        <input
          class="auth-control"
          type="password"
          placeholder="Password"
          bind:value={$password}
          required
        />
        <button class="auth-submit" type="submit">Login</button>
        <div class="padding error" class:hide={!$showError}>{$error}</div>
      </form>
    </div>
  </div>
</div>
