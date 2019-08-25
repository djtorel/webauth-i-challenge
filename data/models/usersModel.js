const db = require('../dbConfig');

const getUsers = () => db('users').select('id', 'username');

const getUserBy = filter =>
  db('users')
    .where(filter)
    .first();

const addUser = user =>
  db('users')
    .insert(user)
    .then(([id]) => getUserBy({ id }));

module.exports = {
  getUsers,
  getUserBy,
  addUser,
};
