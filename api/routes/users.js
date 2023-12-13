const express = require('express');
const bcrypt = require('bcrypt');
const {
  showAllUsers, addUser, showAllUsernames,
} = require('../models/users');

const router = express.Router();

// GET users listing.
router.get('/', (req, res) => {
  return res.json(showAllUsers());
});

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

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const register = await addUser(username, hashPassword);

  if (!register) {
    return res.sendStatus(409); // Conflit
  }

  return res.json(register);
});

router.get('/login', async (req, res) => {
  const username = req?.query?.username?.length !== 0 ? req.query.username : undefined;
  const password = req?.query?.password?.length !== 0 ? req.query.password : undefined;
  console.log(username, password, 'dfsdfs');
  if (!username || !password) return res.sendStatus(400);
  const user = await getUser(username);
  console.log(user);
  if (user === password) {
    return res.sendStatus(200);
  }
  return res.sendStatus(404);
});

module.exports = router;
