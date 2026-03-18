<script>
  import { goto } from '$app/navigation';
  import { authenticate as runAuthenticate, username, password, error, showError } from './login';

  let showPassword = false;
  let showKeyboard = false;
  let keyboardTarget = null;
  let caps = false;
  let keyboardKeys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['', 'Caps', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace', ''],
    ['', '', '', 'Space', '', '', '']
  ];

  const handleAuthenticate = async () => {
    await runAuthenticate(() => goto('/'));
  };

  function openKeyboard(event) {
    showKeyboard = true;
    keyboardTarget = event.target;
  }

  function closeKeyboardIfOutside(event) {
    // Only close if click is outside both input and keyboard
    const keyboard = document.querySelector('.onscreen-keyboard');
    const inputs = Array.from(document.querySelectorAll('.auth-control'));
    if (
      keyboard &&
      !keyboard.contains(event.target) &&
      !inputs.some((input) => input === event.target)
    ) {
      showKeyboard = false;
      keyboardTarget = null;
    }
  }

  function handleKeyboardInput(key) {
    if (!keyboardTarget) return;
    if (key === 'Caps') {
      caps = !caps;
      return;
    }
    let inputKey = key;
    if (caps && /^[a-z]$/i.test(key)) {
      inputKey = key.toUpperCase();
    }
    if (keyboardTarget.placeholder === 'Username') {
      username.update((val) => {
        if (key === 'Backspace') return val.slice(0, -1);
        if (key === 'Space') return val + ' ';
        return val + inputKey;
      });
    } else if (keyboardTarget.placeholder === 'Password') {
      password.update((val) => {
        if (key === 'Backspace') return val.slice(0, -1);
        if (key === 'Space') return val + ' ';
        return val + inputKey;
      });
    }
    keyboardTarget.focus();
  }
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
          on:focus={openKeyboard}
        />
        <input
          class="auth-control"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          bind:value={$password}
          required
          on:focus={openKeyboard}
        />
        <label class="show-password-label" for="show-password">
          <input type="checkbox" id="show-password" bind:checked={showPassword} />
          Show password
        </label>
        <button class="auth-submit" type="submit">Login</button>
        {#if $showError}
          <div class="padding error">{$error}</div>
        {/if}
      </form>
      {#if showKeyboard}
        <div class="onscreen-keyboard" tabindex="-1">
          {#each keyboardKeys as row}
            <div class="keyboard-row">
              {#each row as key}
                {#if key === ''}
                  <div style="flex:1 1 0; min-width:0;"></div>
                {:else if key === 'Space'}
                  <button
                    type="button"
                    class="keyboard-key spacebar"
                    on:click={() => handleKeyboardInput(key)}>Spacebar</button
                  >
                {:else}
                  <button
                    type="button"
                    class="keyboard-key"
                    style="flex:1 1 0; min-width:0;"
                    on:click={() => handleKeyboardInput(key)}
                  >
                    {#if key === 'Caps'}{caps
                        ? 'Caps On'
                        : 'Caps'}{:else if caps && /^[a-z]$/i.test(key)}{key.toUpperCase()}{:else}{key}{/if}
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
