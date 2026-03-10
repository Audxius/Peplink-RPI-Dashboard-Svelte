<script>
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let error = 'Invalid username or password';
  let showError = false;

  const loginPath = '/api/login';

  const authenticate = async () => {
    const response = await fetch(loginPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.stat !== 'ok') {
      showError = true;
      return;
    } else {
      await goto('/');
    }
  };
</script>

<div class="login-page">
  <div class="login-container">
    <div class="panel padding">
      <div class="welcome">Welcome</div>
      <form class="login-form" on:submit|preventDefault={authenticate}>
        <input
          class="auth-control"
          type="text"
          placeholder="Username"
          bind:value={username}
          required
        />
        <input
          class="auth-control"
          type="password"
          placeholder="Password"
          bind:value={password}
          required
        />
        <button class="auth-submit" type="submit">Login</button>
        <div class="padding error" class:hide={!showError}>{error}</div>
      </form>
    </div>
  </div>
</div>

<style>
  .login-page {
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-container {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .welcome {
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    padding-bottom: 30px;
    padding-top: -20px;
    margin-top: -20px;
  }
  .error {
    border: solid 3px #660000;
    background-color: #b03131;
    min-width: 500px;
    padding: 10px;
    border-radius: 10px;
  }
  .hide {
    display: none;
  }
</style>
