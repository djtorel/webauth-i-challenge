const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { getUsers, addUser } = require('../../data/models/usersModel');

router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Unable to retrieve users' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    userData.password = bcrypt.hashSync(userData.password, 10);
    const newUser = await addUser(userData);

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to create new user' });
  }
});

module.exports = router;
