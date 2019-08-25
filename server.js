const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const apiRoutes = require('./routes');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', apiRoutes);

module.exports = server;
