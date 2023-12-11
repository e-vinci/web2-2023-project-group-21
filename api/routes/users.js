/* eslint-disable no-unused-vars */
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const {
  showAllUsers, addUser, showAllUsernames,
} = require('../models/users');

const router = express.Router();

/* GET users listing. /
router.get('/', async (req, res) => {
  const allUser = await showAllUsers();
  return res.json(allUser);
}).

/ Create user */

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

module.exports = router;
