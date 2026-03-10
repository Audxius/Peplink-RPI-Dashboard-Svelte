<script>
  import { onMount } from 'svelte';
  import ApPanel from '$lib/components/ApPanel.svelte';
  import WanAllowancePanel from '$lib/components/WanAllowancePanel.svelte';
  import LanProfilesPanel from '$lib/components/LanProfilesPanel.svelte';
  import WanConnectionsPanel from '$lib/components/WanConnectionsPanel.svelte';
  import ClientsPanel from '$lib/components/ClientsPanel.svelte';
  import DashboardPanel from '$lib/components/DashboardPanel.svelte';
  import { getWanStatusKind } from '$lib/components/WanConnectionsPanelData';
  import { toggleApState } from '$lib/components/ApPanelData';
  import {
    apState,
    clients,
    lanProfiles,
    wanConnections,
    wanAllowances,
    pollApState,
    pollClients,
    pollLanProfiles,
    pollWanConnections,
    pollWanAllowances
  } from '$lib/polling/polling';
  import { accessControl } from '$lib/components/AccessControl';

  const pollingIntervalMs = 5000;

  const pollers = [
    pollApState,
    pollClients,
    pollLanProfiles,
    pollWanConnections,
    pollWanAllowances
  ];

  onMount(() => {
    accessControl();

    pollers.forEach((poll) => void poll());
    const intervalIds = pollers.map((poll) => setInterval(poll, pollingIntervalMs));
    return () => {
      intervalIds.forEach(clearInterval);
    };
  });
</script>

<DashboardPanel />
<div class="row">
  <div>
    <WanConnectionsPanel wanConnections={$wanConnections} {getWanStatusKind} />
    <ClientsPanel clients={$clients} />
  </div>
  <div>
    <ApPanel apState={$apState} Toggle={toggleApState} />
    <LanProfilesPanel lanProfiles={$lanProfiles} />
    <WanAllowancePanel wanAllowances={$wanAllowances} />
  </div>
</div>
