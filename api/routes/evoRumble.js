const express = require('express');
// const { getAllMonsters, getMonstersByType, getAllAttacks } = require('../models/evoRumble');
const {
  getAllEvoMonsters, getAllAttacks,
} = require('../models/bd_evoRumble');

const router = express.Router();

router.get('/', async (req, res) => {
  const allMonsters = await getAllEvoMonsters();
  const allAttacks = await getAllAttacks();
  return res.json({ allMonsters, allAttacks });
});

module.exports = router;
