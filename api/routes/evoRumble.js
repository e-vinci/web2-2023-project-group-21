const express = require('express');
const { getAllMonsters, getMonstersByType, getAllAttacks } = require('../models/evoRumble');

const router = express.Router();

router.get('/', (req, res) => {
  const allMonsters = getAllMonsters();
  const allAttacks = getAllAttacks();
  return res.json({ allMonsters, allAttacks });
});

router.get('/:type', (req, res) => {
  const allMonsters = getMonstersByType(req.params.type);

  return res.json(allMonsters);
});

module.exports = router;
