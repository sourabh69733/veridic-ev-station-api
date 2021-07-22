const router = require('express').Router();

router.use('/users', require('./users'));

router.use('/admin', require("./admin_router"));

module.exports = router;