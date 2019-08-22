const router = require('express').Router();

const { getUsers } = require('../../data/models/usersModel');

router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Unable to retrieve users' });
  }
});

module.exports = router;
