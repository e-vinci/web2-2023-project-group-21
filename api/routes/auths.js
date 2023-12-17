const express = require('express');
const {
  register, login,
} = require('../models/users');

const router = express.Router();

// Create user
router.post('/register', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;
  const passwordC = req?.body?.passwordC?.length !== 0 ? req.body.passwordC : undefined;

  if (!username || !password || !passwordC) {
    return res.sendStatus(400);
  }

  if (password !== passwordC) {
    return res.sendStatus(400);
  }
  const authenticatedUser = await register(username, password);

  if (!authenticatedUser) return res.sendStatus(409); // 409 Conflict

  return res.json(authenticatedUser);
});

router.get('/login', async (req, res) => {
  const username = req?.query?.username?.length !== 0 ? req.query.username : undefined;
  const password = req?.query?.password?.length !== 0 ? req.query.password : undefined;
  const authenticatedUser = await login(username, password);

  if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized
  return res.json(authenticatedUser);
});

module.exports = router;
