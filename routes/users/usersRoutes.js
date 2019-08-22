const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { getUsers, addUser } = require('../../data/models/usersModel');

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await getUsers());
  } catch (err) {
    res.status(500).json({ message: 'Unable to retrieve users' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const userData = {
      ...req.body,
      password: await bcrypt.hashSync(req.body.password, 10),
    };
    res.status(201).json(await addUser(userData));
  } catch (err) {
    res.status(500).json({ message: 'Unable to create new user' });
  }
});

module.exports = router;
