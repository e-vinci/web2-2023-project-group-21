const express = require('express');
const { readLeaderboard } = require('../models/leaderboard');

const router = express.Router();

router.get('/', (req, res) => {
  const leaderboard = readLeaderboard();
  return res.json(leaderboard);
});

module.exports = router;
