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

  let apState = null;
  let clients = [];
  let lanProfiles = [];
  let wanConnections = [];
  let wanAllowances = [];

  const apPath = '/api/cmd.ap';
  const clientPath = '/api/status.client';
  const lanProfilePath = '/api/status.lan.profile';
  const wanConnectionPath = '/api/status.wan.connection';
  const wanAllowancePath = '/api/status.wan.connection.allowance';

  const apiGet = async (path) => {
    const response = await fetch(path, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`GET failed (${response.status})`);
    }

    return response.json();
  };

  const apiPost = async (path, payload) => {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`POST failed (${response.status})`);
    }

    return response.json();
  };

  const toggleApState = async () => {
    const newState = !apState;
    await apiPost(apPath, { enable: newState });
    apState = newState;
  };

  // Checks if the user is authenticated by calling location API.
  const apiPath = '/api/info.location';
  const accessControl = async () => {
    const data = await apiGet(apiPath);

    if (data.stat === 'fail') {
      await goto('/login');
    }
  };

  // Gets AP state
  const pollApState = async () => {
    const data = await apiGet(apPath);
    apState = data?.response?.enable;
  };

  //Gets clients
  const pollClients = async () => {
    const data = await apiGet(clientPath);
    clients = data?.response?.list ?? [];
  };

  // Gets LAN profiles
  const pollLanProfiles = async () => {
    const data = await apiGet(lanProfilePath);
    const response = data?.response ?? {};
    const order = Array.isArray(response.order) ? response.order : [];

    lanProfiles = order
      .map((profileId) => {
        const profile = response[String(profileId)];

        if (!profile) {
          return null;
        }

        return {
          id: profileId,
          ip: profile.ip ?? '-',
          mask: profile.mask ?? '-'
        };
      })
      .filter(Boolean);
  };

  // Gets WAN connections
  const pollWanConnections = async () => {
    const data = await apiGet(wanConnectionPath);
    const response = data?.response ?? {};
    const order = Array.isArray(response.order) ? response.order : [];

    wanConnections = order
      .map((connectionId) => {
        const connection = response[String(connectionId)];

        if (!connection) {
          return null;
        }

        return {
          id: connectionId,
          name: connection.name ?? `WAN ${connectionId}`,
          status: connection.message ?? '-',
          enabled: connection.enable ?? false,
          statusLed: connection.statusLed ?? '',
          ip: connection.ip ?? '-',
          type: connection.type ?? '-',
          uptime: connection.uptime ?? 0
        };
      })
      .filter(Boolean);
  };

  const getWanNameById = (wanId) => {
    const match = wanConnections.find((wan) => String(wan.id) === String(wanId));
    return match?.name ?? `WAN ${wanId}`;
  };

  // Gets WAN allowance
  const pollWanAllowances = async () => {
    const data = await apiGet(wanAllowancePath);
    const response = data?.response ?? {};
    const order = Array.isArray(response.order) ? response.order : [];
    const parsed = [];

    for (const wanId of order) {
      const entry = response[String(wanId)];

      if (!entry || typeof entry !== 'object') {
        continue;
      }

      if (typeof entry.enable === 'boolean') {
        parsed.push({
          wanId,
          wanName: getWanNameById(wanId),
          target: '-',
          enabled: entry.enable
        });
        continue;
      }

      for (const target of Object.keys(entry)) {
        const nested = entry[target];

        if (nested && typeof nested.enable === 'boolean') {
          parsed.push({
            wanId,
            wanName: getWanNameById(wanId),
            target: `SIM ${target}`,
            enabled: nested.enable
          });
        }
      }
    }

    wanAllowances = parsed;
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
    <WanConnectionsPanel {wanConnections} {getWanStatusKind} />
    <ClientsPanel {clients} {isClientOnline} {getClientStateLabel} />
  </div>
  <div>
    <ApPanel {apState} Toggle={toggleApState} />
    <LanProfilesPanel {lanProfiles} />
    <WanAllowancePanel {wanAllowances} />
  </div>
</div>
