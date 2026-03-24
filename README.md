# Peplink RPI Dashboard

This project is a simple web dashboard for a Peplink router.

It is built with SvelteKit and is meant to run in a browser, usually on a Raspberry Pi or another device connected to the same network as the router.

The goal is to be able to:

- log in with your Peplink router account
- see important router information on one screen
- do a few common actions without digging through the router admin UI

If you are not a developer, think of this project as a custom control panel for your router.

## What this dashboard can do

After logging in, the dashboard shows:

- Access Point status
- connected clients/devices
- LAN profiles
- WAN connections
- WAN allowance information
- a router reboot button

The page refreshes its data automatically every 5 seconds.

## What you need

Minimum requirements:

- a Peplink router with API access available on your network
- the router username and password
- Node.js and npm installed on the machine running this app

Recommended:

- a Raspberry Pi if you want a dedicated always-on dashboard screen
- a browser on the same network as the router

## Quick start

If you're using a Raspberry Pi 5, run the install script which you can find under "Releases". If you're not using a Raspberry Pi 5 or would prefer to do it manually:

### 1. Clone the project

```bash
git clone https://github.com/Audxius/Peplink-RPI-Dashboard-Svelte.git
cd Peplink-RPI-Dashboard-Svelte
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm run dev
```

### 4. Open it in your browser

Usually:

```text
http://localhost:5173
```

## How to log in

Use your normal Peplink router username and password.

## What you will see on the dashboard

### Login
<img width="1920" height="1068" alt="login screen" src="https://github.com/user-attachments/assets/e2020fd8-2e4a-44da-8303-ad4c703efa5d" />

### Dashboard
<img width="1901" height="822" alt="dashboard part 1" src="https://github.com/user-attachments/assets/8a361c6a-8563-4c3a-8742-c3c650790b3d" />
<img width="1902" height="892" alt="dashboard part2" src="https://github.com/user-attachments/assets/0c420429-7e9b-4aa5-9ed9-816fdb5627c5" />

## Useful commands

Run local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project structure

For developers, here is the short version:

- [src/routes/login/+page.svelte](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/routes/login/+page.svelte): login screen
- [src/routes/+page.svelte](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/routes/+page.svelte): main dashboard page
- [src/routes/restarting/+page.svelte](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/routes/restarting/+page.svelte): waiting screen after reboot
- [src/lib/api/ApiPostGet.ts](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/lib/api/ApiPostGet.ts): API helpers
- [src/lib/api/endpoints.ts](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/lib/api/endpoints.ts): Peplink API paths used by the app
- [src/lib/polling/polling.ts](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/lib/polling/polling.ts): auto-refresh logic
- [src/lib/components](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/lib/components): dashboard panels and panel actions
- [src/style/style.css](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/style/style.css): app styling

## Common problems

### The login page loads, but login does not work

Check:

- the router IP in [vite.config.ts](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/vite.config.ts)
- that your machine can reach the router on the network
- that your username and password are correct
- that the router API endpoints are available

### The browser says it cannot connect to the app

Check:

- that `npm run dev` is still running
- that you opened the correct local address, usually `http://localhost:5173`

### The dashboard opens, then sends you back to login

This usually means the router session is missing, expired, or the API request failed.

### Router reboot seems stuck

The app waits for the router to go down and come back before redirecting you. If the router takes longer than expected, stay on the restart page a bit longer and make sure the network connection has actually returned.
