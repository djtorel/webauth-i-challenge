const router = require('express').Router();
const bcrypt = require('bcryptjs');

const {
  getUsers,
  getUserBy,
  addUser,
} = require('../../data/models/usersModel');

const auth = require('../../middleware/auth');

router.get('/users', auth, async (req, res) => {
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

    req.session.loggedIn = false;

    const [user] = await getUserBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line require-atomic-updates
      req.session.loggedIn = true;
      res.status(200).json({ message: `Welcome ${user.username}` });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Unable to login' });
  }
});

router.delete('/logout', (req, res) => {
  if (req.session) {
    console.log(req.session);
    req.session.destroy(err =>
      err
        ? res.status(400).json({ message: 'Could not log out' })
        : res.json({ message: 'logged out' })
    );
  } else {
    res.end();
  }
});

module.exports = router;
