const express = require("express");
const router = express.Router();
const ItemVenda = require("../models/ItemVenda");

router.get("/", async (req, res) => {
  try {
    const todos = await ItemVenda.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await ItemVenda.findByPk(req.params.id);
    if (!item)
      return res.status(404).json({ error: "Item de venda não encontrado" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
