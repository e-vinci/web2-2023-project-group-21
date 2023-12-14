const express = require('express');
// const { getAllMonsters, getMonstersByType, getAllAttacks } = require('../models/evoRumble');
const { getAllEvoMonsters } = require('../models/bd_evoRumble');

const router = express.Router();

router.get('/', (req, res) => {
  // const allMonsters = getAllMonsters();
  // const allAttacks = getAllAttacks();
  const all = getAllEvoMonsters();
  return res.json({ all });
});

// router.get('/:type', (req, res) => {
//   const allMonsters = getMonstersByType(req.params.type);

//   return res.json(allMonsters);
// });

module.exports = router;
