<script lang="ts">
  import favicon from '$lib/assets/favicon.png';
  import '../style/style.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>Peplink Dashboard</title>
  <meta
    name="description"
    content="a dashboard for Peplink routers meant to run on Raspberry Pi with a 7-inch display"
  />
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
