const express = require('express');
// const { getAllMonsters, getMonstersByType, getAllAttacks } = require('../models/evoRumble');
const {
  getAllEvoMonsters, addEvoMonster, addAttack, getAllAttacks,
} = require('../models/bd_evoRumble');

const router = express.Router();

router.get('/', async (req, res) => {
  const allMonsters = await getAllEvoMonsters();
  const allAttacks = await getAllAttacks();
  return res.json({ allMonsters, allAttacks });
});

router.post('/', async (req, res) => {
  const newEMonster = {
    id: req.body.id,
    nom: req.body.nom,
    type: req.body.type,
    faiblesses: req.body.faiblesses,
    resistances: req.body.resistances,
    pointsDeVie: req.body.pointsDeVie,
    attaques: req.body.attaques,
  };

  addEvoMonster(
    newEMonster.id,
    newEMonster.nom,
    newEMonster.type,
    newEMonster.faiblesses,
    newEMonster.resistances,
    newEMonster.pointsDeVie,
    newEMonster.attaques,
  );
  return res.json(newEMonster);
});

router.post('/attacks', async (req, res) => {
  const newAttack = {
    name: req.body.name,
    damage: req.body.damage,
    type: req.body.type,
  };

  addAttack(
    newAttack.name,
    newAttack.damage,
    newAttack.type,
  );
  return res.json(newAttack);
});
module.exports = router;
