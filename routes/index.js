const router = require('express').Router();

const usersRouter = require('./users/usersRoutes');

router.use('/users/', usersRouter);

module.exports = router;
