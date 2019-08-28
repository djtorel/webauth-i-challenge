const db = require('../dbConfig');

const getUsers = () => db('users').select('id', 'username');

const getUserBy = filter => db('users').where(filter);

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
  getUserBy,
  addUser,
};
