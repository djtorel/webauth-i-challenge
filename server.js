const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const apiRoutes = require('./routes');

const SESSION_TIME = 1000 * 60 * 60;

const sessionOptions = {
  name: 'authCookie',
  secret: 'ilikecookiestheyareyumyumdelicious',
  cookie: {
    maxAge: SESSION_TIME,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require('./data/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: SESSION_TIME,
  }),
};

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(session(sessionOptions));

server.use('/api', apiRoutes);

module.exports = server;
