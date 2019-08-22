const router = require('express').Router();

const usersRouter = require('./users/usersRoutes');

router.use('/', usersRouter);

module.exports = router;
