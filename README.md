# Peplink RPI Dashboard

This project is a simple web dashboard for a Peplink router.

It is built with SvelteKit and is meant to run in a browser, usually on a Raspberry Pi or another device connected to the same network as the router.

<<<<<<< HEAD
The goal is straightforward:
=======
The goal is:
>>>>>>> 5161d2399487c0447c889c2a9382ddf0b7331f8c

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

## What this project is

This is:

- a frontend app built with SvelteKit
- a local dashboard that talks to the router API
- a project you can run on a Raspberry Pi, laptop, mini PC, or similar device

<<<<<<< HEAD
This is not:

- an official Peplink app
- a cloud service
- a plug-and-play installer in its current form

Important: the old `README` mentioned an `install.sh` script, but that file is not in this repository right now.

## How it works

The app sends requests to Peplink API endpoints such as:

- `/api/login`
- `/api/cmd.ap`
- `/api/status.client`
- `/api/status.lan.profile`
- `/api/status.wan.connection`
- `/api/status.wan.connection.allowance`
- `/api/cmd.system.reboot`

When running locally in development mode, Vite proxies `/api/...` requests to the router IP configured in [vite.config.ts](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/vite.config.ts).

Right now that IP is:

```ts
https://192.168.50.1
```

If your router uses a different address, you must change it before running the app.

## What you need

Minimum requirements:

- a Peplink router with API access available on your network
- the router username and password
- Node.js and npm installed on the machine running this app

Recommended:

- a Raspberry Pi if you want a dedicated always-on dashboard screen
- a browser on the same network as the router

## Quick start

=======
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

>>>>>>> 5161d2399487c0447c889c2a9382ddf0b7331f8c
### 1. Clone the project

```bash
git clone https://github.com/Audxius/Peplink-RPI-Dashboard-Svelte.git
cd Peplink-RPI-Dashboard-Svelte
```

### 2. Install dependencies

```bash
npm install
```

<<<<<<< HEAD
### 3. Set your router IP

Open [vite.config.ts](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/vite.config.ts) and find this part:

```ts
target: 'https://192.168.50.1'
```

Change it to your router address if needed. Example:

```ts
target: 'https://192.168.1.1'
```

Notes:

- keep the `https://`
- the app currently expects the router to be reachable directly from the machine running the dashboard
- `secure: false` is already set, which helps if the router uses a self-signed certificate

### 4. Start the app
=======
### 3. Start the app
>>>>>>> 5161d2399487c0447c889c2a9382ddf0b7331f8c

```bash
npm run dev
```

<<<<<<< HEAD
### 5. Open it in your browser
=======
### 4. Open it in your browser
>>>>>>> 5161d2399487c0447c889c2a9382ddf0b7331f8c

Usually:

```text
http://localhost:5173
```

## How to log in

Use your normal Peplink router username and password.

<<<<<<< HEAD
If login works, you will be sent to the dashboard page.

If login fails, the app shows an error message.

## What you will see on the dashboard

### Dashboard header

- a page title
- a logout button

### Access Point panel

- shows whether the access point is `ON` or `OFF`
- lets you toggle it

### Router reset panel

- lets you reboot the router
- asks for confirmation first
- shows a restart screen while the router comes back online

### Clients panel

Shows:

- device name
- whether the device is online or offline
- IP address
- connection type

### LAN profiles panel

Shows:

- LAN profile ID
- IP
- subnet mask

### WAN panel

Shows:

- WAN name
- status
- IP
- type
- uptime

### WAN allowance panel

Shows whether WAN allowance is enabled or disabled for each WAN or SIM target.

## Useful commands

Install dependencies:

```bash
npm install
```

=======
## What you will see on the dashboard

### Login 
<img width="1920" height="1068" alt="login screen" src="https://github.com/user-attachments/assets/d8de5e64-006c-4631-9495-2832cd1f0c88" />

### Dashboard 
<img width="1901" height="822" alt="dashboard part 1" src="https://github.com/user-attachments/assets/9e980d88-f36d-47c2-a2ee-10abcce5e665" />
<img width="1902" height="892" alt="dashboard part2" src="https://github.com/user-attachments/assets/8f299abd-dfdf-45fb-9558-dee705d86e5a" />

## Useful commands

>>>>>>> 5161d2399487c0447c889c2a9382ddf0b7331f8c
Run local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

<<<<<<< HEAD
Preview the production build locally:

```bash
npm run preview
```

Run type and Svelte checks:

```bash
npm run check
```

Format the code:

```bash
npm run format
```

Check formatting without changing files:

```bash
npm run format:check
```

=======
>>>>>>> 5161d2399487c0447c889c2a9382ddf0b7331f8c
## Project structure

For developers, here is the short version:

<<<<<<< HEAD
- [src/routes/login/+page.svelte](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/routes/login/+page.svelte): login screen
- [src/routes/+page.svelte](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/routes/+page.svelte): main dashboard page
- [src/routes/restarting/+page.svelte](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/routes/restarting/+page.svelte): waiting screen after reboot
- [src/lib/api/ApiPostGet.ts](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/lib/api/ApiPostGet.ts): API helpers
- [src/lib/api/endpoints.ts](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/lib/api/endpoints.ts): Peplink API paths used by the app
- [src/lib/polling/polling.ts](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/lib/polling/polling.ts): auto-refresh logic
- [src/lib/components](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/lib/components): dashboard panels and panel actions
- [src/style/style.css](/home/audrius/Desktop/Peplink-RPI-Dashboard-Svelte/src/style/style.css): app styling
=======
- [src/routes/login/+page.svelte](/src/routes/login/+page.svelte): login screen
- [src/routes/+page.svelte](/src/routes/+page.svelte): main dashboard page
- [src/routes/restarting/+page.svelte](/src/routes/restarting/+page.svelte): waiting screen after reboot
- [src/lib/api/ApiPostGet.ts](/src/lib/api/ApiPostGet.ts): API helpers
- [src/lib/api/endpoints.ts](/src/lib/api/endpoints.ts): Peplink API paths used by the app
- [src/lib/polling/polling.ts](/src/lib/polling/polling.ts): auto-refresh logic
- [src/lib/components](/src/lib/components): dashboard panels and panel actions
- [src/style/style.css](/src/style/style.css): app styling
>>>>>>> 5161d2399487c0447c889c2a9382ddf0b7331f8c

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
<<<<<<< HEAD

## Current limitations

- the router target is hardcoded in development config
- production deployment is not fully documented in this repository yet
- there is no installer script included right now
- this project assumes familiarity with the Peplink router environment

## Tech stack

- Svelte 5
- SvelteKit
- TypeScript
- Vite

## In plain English

If you want the shortest possible explanation:

1. This app gives you a cleaner screen for checking a Peplink router.
2. You run it on a device in the same network.
3. You point it at your router IP.
4. You log in with your router account.
5. You monitor clients, WAN, LAN, and access point status from one page.
=======
>>>>>>> 5161d2399487c0447c889c2a9382ddf0b7331f8c
