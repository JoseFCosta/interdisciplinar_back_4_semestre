const express = require("express");
const router = express.Router();
const ItemVenda = require("../models/ItemVenda");

router.post("/", async (req, res) => {
  try {
    const novo = await ItemVenda.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

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

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ItemVenda.destroy({
      where: { IDITEMVENDA: req.params.id },
    });
    if (!deleted)
      return res.status(404).json({ error: "Item de venda não encontrado" });
    res.json({ message: "Item de venda excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
