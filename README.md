# Peplink RPI Dashboard

A lightweight web dashboard for monitoring and managing a Peplink router from a Raspberry Pi.

This project provides a simple browser-based interface to view network status and perform basic management tasks.

---

## Features

The dashboard aggregates key router information in one place:

- Wi-Fi / access point status  
- Connected devices  
- LAN profiles  
- Internet (WAN) connections  
- Internet (WAN) allowance  
- Basic controls (e.g. reboot router, toggle access point)  

Data is automatically refreshed every 5 seconds.

---

## Requirements

- Peplink router with API access enabled  
- Raspberry Pi (or any device on the same network)  

> Node.js is only required for manual setup. The install script installs it automatically.

---

## Quick Install (Raspberry Pi)

Use the automated install script:

1. Download `install.sh` from this repository
2. Open a terminal in the download directory
3. Run:

```bash
chmod +x install.sh
./install.sh
```

The script will:
- Install all dependencies
- Clone the project
- Build the application
- Configure autostart

After completion, the system will reboot and launch the dashboard in kiosk mode.

---

## Manual Setup

### 1. Clone the repository
```bash
git clone https://github.com/Audxius/Peplink-RPI-Dashboard-Svelte.git
cd Peplink-RPI-Dashboard-Svelte
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the application
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## Login

Use your Peplink router credentials.

---

## Notes

- The install script is intended for Raspberry Pi environments running Wayland.
- Ensure a stable internet connection during setup.
