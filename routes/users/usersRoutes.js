const router = require('express').Router();
const bcrypt = require('bcryptjs');

const {
  getUsers,
  getUserBy,
  addUser,
} = require('../../data/models/usersModel');

router.get('/users', async (req, res) => {
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

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUserBy({ username });
    user && bcrypt.compareSync(password, user.password)
      ? res.status(200).json({ message: `Welcome ${user.username}` })
      : res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    res.status(500).json({ message: 'Unable to login' });
  }
});

module.exports = router;
