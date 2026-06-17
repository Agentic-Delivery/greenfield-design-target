const express = require("express");
const path = require("path");
const app = express();

// Operator-tunable freshness window (AC-3b / REQ R4). Defaults to 15 minutes.
const FRESHNESS_WINDOW_MS = process.env.FRESHNESS_WINDOW_MINUTES
  ? Number(process.env.FRESHNESS_WINDOW_MINUTES) * 60_000
  : 15 * 60_000;

// Existing endpoint — preserved exactly
app.get("/api/notes", (_req, res) => res.json([{ id: 1, title: "First note" }]));

// Tidal data proxy — TIDAL_API_KEY is held server-side only (REQ R7)
app.get("/api/tide", async (_req, res) => {
  if (process.env.TIDAL_API_KEY && process.env.TIDAL_API_ENDPOINT) {
    try {
      const upstream = await fetch(process.env.TIDAL_API_ENDPOINT, {
        headers: { Authorization: `Bearer ${process.env.TIDAL_API_KEY}` },
      });
      if (!upstream.ok) throw new Error(`Upstream ${upstream.status}`);
      const data = await upstream.json();
      // Inject server-controlled freshness window so the client uses the operator lever
      res.json({ ...data, freshnessWindowMs: FRESHNESS_WINDOW_MS });
    } catch {
      res.status(502).json({ error: "Upstream tidal API unavailable" });
    }
  } else {
    // Development / staging without credentials — return mock data
    res.json(mockTideData());
  }
});

function mockTideData() {
  return {
    freshnessWindowMs: FRESHNESS_WINDOW_MS,
    readingTimestamp: Date.now(),
    location: "Holy Island Causeway",
    heightMetres: "2.4",
    trend: "rising",
    changeLastHour: "+0.45m",
    highWaterTime: "14:30",
    crossing: {
      status: "safe",
      windowLabel: "12:15 – 13:45",
      closesIn: "closes in 45m",
      nextWindow: "18:30",
      nextWindowOpensIn: "5h 15m",
    },
  };
}

// Serve built frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../web/dist")));
  app.get("*", (_req, res) =>
    res.sendFile(path.join(__dirname, "../web/dist/index.html"))
  );
}

app.listen(3000, () => console.log("tide-now api on :3000"));
