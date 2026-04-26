# BlueStation DashUI

A simple web dashboard for monitoring and controlling
[MidnightBlueLabs/tetra-bluestation](https://github.com/MidnightBlueLabs/tetra-bluestation).

## Features

- **Service status** — state, uptime, version
- **Active subscribers** — ID, name, state, current talkgroup, last-seen
- **Timeslots** — slot number, channel, usage type, assignment, occupancy bar
- **Talkgroups** — ID, name, active member count, traffic state
- **Service control** — Start / Stop / Restart with loading and error feedback

---

## Architecture

```
bluestation-dashui/
├── backend/          Node.js / Express API server
│   └── src/
│       ├── adapters/
│       │   ├── mock.js          ← demo data (default)
│       │   └── bluestation.js   ← real integration stub
│       └── routes/              ← one file per endpoint group
└── frontend/         React + Vite dashboard
    └── src/
        ├── api.js               ← all fetch calls
        └── components/          ← one component per view
```

The backend exposes:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/status` | Service state, uptime, version |
| GET | `/subscribers` | List of active subscribers |
| GET | `/timeslots` | Timeslot usage |
| GET | `/talkgroups` | Talkgroup list |
| POST | `/control/start` | Start the service |
| POST | `/control/stop` | Stop the service |
| POST | `/control/restart` | Restart the service |

---

## Quick start

### Prerequisites

- Node.js ≥ 18

### 1 — Install dependencies

```bash
cd backend  && npm install
cd ../frontend && npm install
```

### 2 — Start the backend

```bash
cd backend
npm run dev        # uses mock adapter by default
```

The API server listens on **http://localhost:3001**.

### 3 — Start the frontend (development)

```bash
cd frontend
npm run dev
```

The dashboard opens on **http://localhost:3000**.  
All `/status`, `/subscribers`, `/timeslots`, `/talkgroups`, and `/control/*`
requests are proxied to the backend automatically in dev mode.

### 4 — Production build

```bash
cd frontend
npm run build      # output → frontend/dist/
```

Serve `frontend/dist/` with any static file server, pointing API calls at the
backend URL via the `VITE_API_BASE` environment variable:

```bash
VITE_API_BASE=http://your-backend-host:3001 npm run build
```

---

## Switching to real BlueStation integration

1. Open **`backend/src/adapters/bluestation.js`**.
2. Implement the five async functions:
   - `getStatus()` — return service state, uptime, version, errors
   - `getSubscribers()` — return subscriber list
   - `getTimeslots()` — return timeslot list
   - `getTalkgroups()` — return talkgroup list
   - `control(action)` — handle `'start'` / `'stop'` / `'restart'`
3. Run the backend with the real adapter:

```bash
ADAPTER=bluestation npm start
```

The mock adapter (`mock.js`) is kept in place for local development and testing
without a live BlueStation instance.

---

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ADAPTER` | `mock` | Backend adapter to use (`mock` or `bluestation`) |
| `PORT` | `3001` | Backend listen port |
| `VITE_API_BASE` | *(empty)* | Frontend: override API base URL for production builds |

---

## License

MIT — see [LICENSE](LICENSE).