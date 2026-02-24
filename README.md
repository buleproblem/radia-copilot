# radia-copilot

> **A radio for everyone.** Radia is a real-time, collaborative internet-radio platform with track fingerprinting, listener presence, and live transcription—built as a modern microservices monorepo.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser / Client                        │
│                    Next.js  (apps/web  :3000)                   │
└────────┬────────────────┬──────────────┬───────────────┬────────┘
         │                │              │               │
         ▼                ▼              ▼               ▼
  ┌─────────────┐  ┌────────────┐  ┌─────────┐  ┌─────────────┐
  │ steel-proxy │  │human-engine│  │analyzer │  │  postgres   │
  │  Rust/Axum  │  │  Node/TS   │  │ Python  │  │  + redis    │
  │   :8080     │  │   :3001    │  │  :8000  │  │  :5432/6379 │
  └─────────────┘  └────────────┘  └─────────┘  └─────────────┘
```

### Services

| Service | Language | Port | Responsibility |
|---|---|---|---|
| `apps/web` | Next.js / TypeScript | 3000 | UI — 4 screens (see below) |
| `services/steel-proxy` | Rust / Axum | 8080 | Audio stream coalescing, SSE presence, ICY metadata |
| `services/human-engine` | Node.js / TypeScript | 3001 | User profiles, listening rooms, WebSocket chat |
| `services/analyzer` | Python / FastAPI | 8000 | Track fingerprinting, transcription, telemetry |
| `redis` | Redis 7 | 6379 | Pub/sub, caching, session store |
| `postgres` | PostgreSQL 16 | 5432 | Persistent data (users, rooms, history) |

---

## UI Screens

1. **Discovery / Home** — Browse and search stations; globe visualisation shows live listener density by continent.
2. **Player** — Full-screen now-playing view with waveform, track info (from Analyzer fingerprint), and listener count (from steel-proxy SSE).
3. **Listening Room** — Collaborative room with real-time chat (WebSocket via human-engine) and shared queue.
4. **Profile** — User stats, listening history, and room management.

---

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/) v2

### Run everything with Docker Compose

```bash
git clone https://github.com/your-org/radia-copilot.git
cd radia-copilot
docker compose up --build
```

| URL | Service |
|---|---|
| http://localhost:3000 | Web UI |
| http://localhost:8080/health | steel-proxy |
| http://localhost:3001/health | human-engine |
| http://localhost:8000/health | analyzer |

---

## Local Development (without Docker)

### 1. Web (Next.js)

```bash
cd apps/web
npm install
npm run dev          # http://localhost:3000
```

### 2. steel-proxy (Rust)

```bash
cd services/steel-proxy
cargo run            # http://localhost:8080
```

Environment variables (optional):

| Variable | Default | Description |
|---|---|---|
| `RUST_LOG` | `steel_proxy=info` | Log level filter |

### 3. human-engine (Node.js / TypeScript)

```bash
cd services/human-engine
npm install
npm run dev          # http://localhost:3001
```

Environment variables:

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | HTTP/WS listen port |
| `DATABASE_URL` | — | PostgreSQL connection string |
| `REDIS_URL` | — | Redis connection string |

### 4. analyzer (Python / FastAPI)

```bash
cd services/analyzer
pip install -r requirements.txt
python main.py       # http://localhost:8000
```

---

## API Reference (summary)

### steel-proxy `:8080`

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/stream/:station_id` | Coalesced audio stream redirect |
| GET | `/sse/presence/:station_id` | SSE — listener presence updates |
| GET | `/meta/:station_id` | ICY metadata as JSON |

### human-engine `:3001`

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/profile/:userId` | User profile |
| POST | `/room` | Create listening room |
| GET | `/room/:roomId` | Room info & participants |
| WS | `/?roomId=&userId=` | WebSocket — room chat & presence |

### analyzer `:8000`

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| POST | `/fingerprint` | Track fingerprint from audio buffer |
| GET | `/telemetry/continent/:code` | Listener telemetry by continent |
| POST | `/transcribe` | Live audio transcription |

---

## Repository Layout

```
radia-copilot/
├── apps/
│   └── web/                  # Next.js frontend
├── services/
│   ├── steel-proxy/          # Rust/Axum audio proxy
│   ├── human-engine/         # Node.js/TS social layer
│   └── analyzer/             # Python/FastAPI AI layer
├── docker-compose.yml
└── README.md
```

---

## Contributing

1. Fork the repo and create a feature branch.
2. Run `docker compose up --build` and verify all health endpoints return `{"status":"ok"}`.
3. Open a pull request — CI will run lint, type-check, and `cargo check`.

