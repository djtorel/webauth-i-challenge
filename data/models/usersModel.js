const db = require('../dbConfig');

const getUsers = () => db('users');

const getUserBy = filter =>
  db('users')
    .where(filter)
    .first();

const addUser = user =>
  db('users')
    .insert(user)
    .then(([id]) => getUserById(id));

module.exports = {
  getUsers,
  getUserBy,
  addUser,
};
