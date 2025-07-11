const express = require("express");
const router = express.Router();
const MovContabil = require("../models/MovContabil");

router.post("/", async (req, res) => {
  try {
    const novaMov = await MovContabil.create(req.body);
    res.status(201).json(novaMov);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const todas = await MovContabil.findAll();
    res.json(todas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
