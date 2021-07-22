const router = require('express').Router();

router.use('/api/users', require('./users_routes'));

router.use('/api/admin', require("./admin_routes"));

module.exports = router;