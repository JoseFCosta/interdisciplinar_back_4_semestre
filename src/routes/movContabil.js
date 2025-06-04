const express = require('express');
const router = express.Router();
const MovContabil = require('../models/MovContabil');

// CREATE
router.post('/', async (req, res) => {
  try {
    const novaMov = await MovContabil.create(req.body);
    res.status(201).json(novaMov);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const todas = await MovContabil.findAll();
    res.json(todas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const mov = await MovContabil.findByPk(req.params.id);
    if (!mov) return res.status(404).json({ error: 'Movimentação não encontrada' });
    res.json(mov);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const mov = await MovContabil.findByPk(req.params.id);
    if (!mov) return res.status(404).json({ error: 'Movimentação não encontrada' });

    await mov.update(req.body);
    res.json(mov);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MovContabil.destroy({ where: { IDMOVCONTAB: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Movimentação não encontrada' });
    res.json({ message: 'Movimentação excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
