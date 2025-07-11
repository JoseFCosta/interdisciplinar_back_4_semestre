const express = require("express");
const router = express.Router();
const PlanoConta = require("../models/PlanoConta");

router.get("/", async (req, res) => {
  try {
    const todos = await PlanoConta.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const plano = await PlanoConta.findByPk(req.params.id);
    if (!plano)
      return res.status(404).json({ error: "Plano de conta não encontrado" });
    res.json(plano);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
