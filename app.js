const express = require("express");
const cors = require("cors");
const path = require("path");

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

// Create the Express application
var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require("./config/database");

// Must first load the models
require("./models/user");
require("./models/orders");

// Pass the global passport object into the configuration function
// require("./config/passport")(passport);   not using it anymore using our own implementation for jwt

// This will initialize the passport object on every request
// app.use(passport.initialize());      not using it anymore using our own implementation for jwt

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require("./routes"));

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000


const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
