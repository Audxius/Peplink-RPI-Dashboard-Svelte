<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import {
    authenticate,
    username,
    password,
    error,
    showError,
    showPassword,
    showKeyboard,
    caps,
    keyboardKeys,
    openKeyboard,
    closeKeyboard,
    handleKeyboardInput,
    resolveDisplayKey
  } from './login';

  let keyboardElement: HTMLDivElement | null = null;
  let usernameInput: HTMLInputElement | null = null;
  let passwordInput: HTMLInputElement | null = null;

  const handleAuthenticate = async () => {
    await authenticate(() => goto('/'));
  };

  function handleFocus(target: 'username' | 'password') {
    openKeyboard(target);
  }

  function handleOutsideClick(event: MouseEvent) {
    const target = event.target as Node | null;
    if (!target) return;

    const clickedKeyboard = keyboardElement?.contains(target) ?? false;
    const clickedUsername = usernameInput === target;
    const clickedPassword = passwordInput === target;

    if (!clickedKeyboard && !clickedUsername && !clickedPassword) {
      closeKeyboard();
    }
  }

  onMount(() => {
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  });
</script>

<div class="login-page">
  <div class="login-container">
    <div class="panel padding">
      <div class="welcome">Welcome</div>

      <form class="login-form" on:submit|preventDefault={handleAuthenticate}>
        <input
          bind:this={usernameInput}
          class="auth-control"
          type="text"
          placeholder="Username"
          bind:value={$username}
          required
          on:focus={() => handleFocus('username')}
        />

        <input
          bind:this={passwordInput}
          class="auth-control"
          type={$showPassword ? 'text' : 'password'}
          placeholder="Password"
          bind:value={$password}
          required
          on:focus={() => handleFocus('password')}
        />

        <label class="show-password-label" for="show-password">
          <input type="checkbox" id="show-password" bind:checked={$showPassword} />
          Show password
        </label>

        <button class="auth-submit" type="submit">Login</button>

        {#if $showError}
          <div class="padding error">{$error}</div>
        {/if}
      </form>

      {#if $showKeyboard}
        <div class="onscreen-keyboard" tabindex="-1" bind:this={keyboardElement}>
          {#each keyboardKeys as row}
            <div class="keyboard-row">
              {#each row as key}
                {#if key === ''}
                  <div style="flex:1 1 0; min-width:0;"></div>
                {:else if key === 'Space'}
                  <button
                    type="button"
                    class="keyboard-key spacebar"
                    on:click={() => handleKeyboardInput(key)}
                  >
                    Spacebar
                  </button>
                {:else}
                  <button
                    type="button"
                    class="keyboard-key"
                    style="flex:1 1 0; min-width:0;"
                    on:click={() => handleKeyboardInput(key)}
                  >
                    {resolveDisplayKey(key, $caps)}
                  </button>
                {/if}
              {/each}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
