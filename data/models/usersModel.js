const db = require('../dbConfig');

const getUsers = () => db('users');

const getUserById = id => db('users').where({ id });

module.exports = {
  getUsers,
  getUserById,
};
