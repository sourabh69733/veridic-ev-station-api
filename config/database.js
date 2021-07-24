const mongoose = require("mongoose");

require("dotenv").config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * DB_ATLAS_DATABASE = mongo "mongodb+srv://sahu-cluster.kqu3q.mongodb.net/tutorial_db" --username saurabh3570
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */

// const devConnection = process.env.DB_STRING;
// const prodConnection = process.env.DB_STRING_PROD;
// 
// Connect to the correct environment database
// if (process.env.NODE_ENV === "production") {
  // mongoose.connect(prodConnection, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  // });
// 
  // mongoose.connection.on("connected", () => {
    // console.log("Moongoose Database connected In production");
  // });
// } else {
  // mongoose.connect(devConnection, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  // });
// 
  // mongoose.connection.on("connected", () => {
    // console.log("Database connected in general usecase");
  // });
// }


/**
 * -------Database deployed running on mongod Atlas cluster--------------
 */

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
