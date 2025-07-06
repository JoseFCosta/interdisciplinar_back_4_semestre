const express = require("express");
const router = express.Router();
const OrdemCompra = require("../models/OrdemCompra");

router.post("/", async (req, res) => {
  try {
    const nova = await OrdemCompra.create(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const todas = await OrdemCompra.findAll();
    res.json(todas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ord = await OrdemCompra.findByPk(req.params.id);
    if (!ord)
      return res.status(404).json({ error: "Ordem de compra não encontrada" });
    res.json(ord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const ord = await OrdemCompra.findByPk(req.params.id);
    if (!ord)
      return res.status(404).json({ error: "Ordem de compra não encontrada" });
    await ord.update(req.body);
    res.json(ord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await OrdemCompra.destroy({
      where: { IDORDCOMP: req.params.id },
    });
    if (!deleted)
      return res.status(404).json({ error: "Ordem de compra não encontrada" });
    res.json({ message: "Ordem de compra excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
