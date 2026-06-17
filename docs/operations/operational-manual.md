# Tide-Now Operational Manual

## Deployment Topology

- **Platform:** Render.com (Web Service)
- **Service name:** `tide-now` (or as configured in Render dashboard)
- **Runtime:** Node.js 20 (single process — Express serves both the API and the built React frontend)
- **Start command:** `NODE_ENV=production node api/server.js`
- **Build command:** `npm --prefix web install && npm --prefix web run build`

## Test Deployment Source

**Mode:** `deploy-from-main`

Merging to `main` triggers the GitHub Actions CI pipeline. On success the `deploy` job fires the Render deploy hook, which rebuilds and redeploys the service (~2–3 minutes).

## Test Environment

- **URL:** Declared in `docs/project-context.md` under `## Customer-Viewable URL`
- **Safety zone:** The Render-hosted service is the ONLY valid verification target. `localhost:3000` and container-internal addresses are NOT valid post-deploy targets.

## Health Check

```bash
curl -s <STAGING_URL>/api/tide | jq '.readingTimestamp'
```

A non-null `readingTimestamp` value confirms the API is serving. HTTP 200 on `<STAGING_URL>/` confirms the frontend is serving.

## Levers

| Lever | Env var | Read | Set | Restore | Req |
|---|---|---|---|---|---|
| Tidal API key | `TIDAL_API_KEY` | _not readable — secret_ | Set in Render dashboard → Environment | Remove the variable | REQ-web-tide-home R7 |
| Tidal API endpoint | `TIDAL_API_ENDPOINT` | _not readable — secret_ | Set in Render dashboard → Environment | Remove the variable | REQ-web-tide-home R7 |
| Freshness window | `FRESHNESS_WINDOW_MINUTES` | `echo $FRESHNESS_WINDOW_MINUTES` (Render shell) | Set in Render dashboard → Environment | Remove variable (reverts to 15-minute default) | REQ-web-tide-home R4 |
| Node environment | `NODE_ENV` | `echo $NODE_ENV` | Set in Render dashboard → Environment | Set back to `production` | — |

## Component Operational Profile

### API process (`api/server.js`)

- **Serves:** `GET /api/notes` (legacy), `GET /api/tide` (tidal proxy / mock), static frontend files
- **Port:** 3000 (internal; Render routes traffic through its edge)
- **Tidal proxy behaviour:** When `TIDAL_API_KEY` + `TIDAL_API_ENDPOINT` are both set, proxies upstream. Otherwise returns mock data with `readingTimestamp = Date.now()`.
- **Mock data fresh:** The mock always returns `readingTimestamp = now`, so `feedStatus` will always be `LIVE` in staging without credentials — stale/error states require manipulating the upstream or using a custom `TIDAL_API_ENDPOINT` that returns old timestamps.

### Frontend build (`web/dist/`)

- Built by Vite at deploy time. Served as static files by Express.
- No API keys or secrets in the bundle (verified by `AC-7`).

## Failure Taxonomy

| Symptom | Likely cause | Fix |
|---|---|---|
| `/api/tide` returns 502 | `TIDAL_API_ENDPOINT` unreachable or `TIDAL_API_KEY` invalid | Check env vars in Render dashboard; verify upstream API status |
| Frontend blank / 404 | Build step failed — `web/dist/` not produced | Check Render deploy log for build errors; run `npm --prefix web run build` locally |
| `feedStatus` always `stale` | `readingTimestamp` in upstream API response is old | Check upstream tidal data provider; mock data cannot trigger stale (it uses `Date.now()`) |
| Deploy not triggered after merge | `RENDER_DEPLOY_HOOK_URL` secret missing | Add `RENDER_DEPLOY_HOOK_URL` in repo Settings → Secrets → Actions |

## Verification Backends

**verification_backends:** shadow-qg

The delivery-verifier uses the `shadow-qg` backend. It drives a real browser against the staging URL (`<STAGING_URL>/`) to verify each AC through the full consumer path.

## Operator One-Time Setup (bootstrap)

- [ ] Create a Render Web Service connected to this repository
- [ ] Set start command: `NODE_ENV=production node api/server.js`
- [ ] Set build command: `npm --prefix web install && npm --prefix web run build`
- [ ] Add Render deploy hook URL as `RENDER_DEPLOY_HOOK_URL` in repository secrets
- [ ] (Optional) Add `TIDAL_API_KEY` and `TIDAL_API_ENDPOINT` in Render environment for live data
- [ ] Record the staging URL in `docs/project-context.md` under `## Customer-Viewable URL`
