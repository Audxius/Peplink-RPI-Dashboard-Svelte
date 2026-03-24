<script lang="ts">
  import {
    caps,
    error,
    handleAuthenticate,
    handleFocus,
    handleKeyboardInput,
    handleOutsideClick,
    handleSubmit,
    keyboardKeys,
    password,
    resolveDisplayKey,
    showError,
    showKeyboard,
    showPassword,
    username
  } from './login';
</script>

<svelte:window on:mousedown={handleOutsideClick} />

<div class="login-page">
  <div class="login-container">
    <div class="panel padding">
      <div class="welcome">Welcome</div>

      <form
        class="login-form"
        onsubmit={handleSubmit}
        on:submit|preventDefault={handleAuthenticate}
      >
        <input
          data-login-field="username"
          class="auth-control"
          type="text"
          placeholder="Username"
          bind:value={$username}
          required
          on:focus={() => handleFocus('username')}
        />

        <input
          data-login-field="password"
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
        <div class="onscreen-keyboard" tabindex="-1" data-login-surface="keyboard">
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
