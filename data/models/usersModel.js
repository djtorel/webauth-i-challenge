const db = require('../dbConfig');

const getUsers = () => db('users');

const getUserById = id =>
  db('users')
    .where({ id })
    .first();

const addUser = user =>
  db('users')
    .insert(user)
    .then(([id]) => getUserById(id));

module.exports = {
  getUsers,
  getUserById,
  addUser,
};
