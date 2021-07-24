const router = require('express').Router();

// ALL API only for user
router.use('/api/users', require('./users_routes'));

// all API only for admin
router.use('/api/admin', require("./admin_routes"));

// route only for handling all types of routes
router.use("/api/auth" , require("./auth_routes"));

module.exports = router;