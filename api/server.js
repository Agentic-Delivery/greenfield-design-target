const express = require("express");
const app = express();
app.get("/api/notes", (_req, res) => res.json([{ id: 1, title: "First note" }]));
app.listen(3000, () => console.log("notes api on :3000"));
