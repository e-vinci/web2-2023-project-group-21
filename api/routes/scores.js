const express = require('express');
const { getScore, updateScore, getLeaderboard } = require('../models/scores');

const router = express.Router();

router.get('/getScore', async (req, res) => {
  const username = req?.query?.username?.length !== 0 ? req.query.username : undefined;
  const userFoundScore = await getScore(username);
  if (userFoundScore === undefined) return res.sendStatus(404);
  return res.json(userFoundScore);
});

router.post('/updateScore', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const score = req?.body?.score?.length !== 0 ? req.body.score : undefined;
  if (!username || !score) {
    return res.sendStatus(400);
  }

  const updatedScore = await updateScore(username, score);

  if (!updatedScore) return res.sendStatus(500);

  return res.sendStatus(200);
});

router.get('/leaderboard', async (req, res) => {
  const leaderboard = await getLeaderboard();
  if (leaderboard === undefined) res.sendStatus(404);
  return res.json(leaderboard);
});

module.exports = router;
