<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import ApPanel from '$lib/components/ApPanel.svelte';
  import WanAllowancePanel from '$lib/components/WanAllowancePanel.svelte';
  import LanProfilesPanel from '$lib/components/LanProfilesPanel.svelte';
  import WanConnectionsPanel from '$lib/components/WanConnectionsPanel.svelte';
  import ClientsPanel from '$lib/components/ClientsPanel.svelte';
  import DashboardPanel from '$lib/components/DashboardPanel.svelte';
  import { isClientOnline, getClientStateLabel } from '$lib/components/ClientPanelData';
  import { getWanStatusKind } from '$lib/components/WanConnectionsPanelData';
  import { apiGet, apiPost } from '$lib/api/ApiPostGet';
  import { endpoints } from '$lib/api/endpoints';
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

  const toggleApState = async () => {
    const newState = !$apState;
    await apiPost(endpoints.ap, { enable: newState });
    apState.set(newState);
  };

  // Checks if the user is authenticated by calling location API.
  const apiPath = '/api/info.location';
  const accessControl = async () => {
    const data = await apiGet(apiPath);

    if (data.stat === 'fail') {
      await goto('/login');
    }
  };

  const POLL_INTERVAL_MS = 10_000;

  onMount(() => {
    accessControl();
    pollApState();
    pollClients();
    pollLanProfiles();
    pollWanConnections();
    pollWanAllowances();

    const pollApId = setInterval(pollApState, POLL_INTERVAL_MS);
    const pollClientsId = setInterval(pollClients, POLL_INTERVAL_MS);
    const pollLanProfilesId = setInterval(pollLanProfiles, POLL_INTERVAL_MS);
    const pollWanConnectionsId = setInterval(pollWanConnections, POLL_INTERVAL_MS);
    const pollWanAllowancesId = setInterval(pollWanAllowances, POLL_INTERVAL_MS);

    return () => {
      clearInterval(pollApId);
      clearInterval(pollClientsId);
      clearInterval(pollLanProfilesId);
      clearInterval(pollWanConnectionsId);
      clearInterval(pollWanAllowancesId);
    };
  });
</script>

<DashboardPanel />
<div class="row">
  <div>
    <WanConnectionsPanel wanConnections={$wanConnections} {getWanStatusKind} />
    <ClientsPanel clients={$clients} {isClientOnline} {getClientStateLabel} />
  </div>
  <div>
    <ApPanel apState={$apState} Toggle={toggleApState} />
    <LanProfilesPanel lanProfiles={$lanProfiles} />
    <WanAllowancePanel wanAllowances={$wanAllowances} />
  </div>
</div>
