const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
// const mongoose = require("mongoose");
// const User = mongoose.model("User");

const pathToKeyPriv = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKeyPriv, "utf8");

const pathToKeyPub = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKeyPub, "utf8");

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */

function genPassword(password) {
  if (typeof password !== "string") {
    password = String(password);
  }
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  const _id = user._id;

  const expiresIn = "5d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

const authMiddleware = (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization.split(" ");
  }
  catch (err){
    return res.json({ msg:"you are not authorised"})
  }
  const jwtToken = req.headers.authorization.split(" ");

  const id = req.body._id;
  if (jwtToken[0] == "Bearer" && jwtToken[1].match(/\S+.\S+.\S+/) !== null) {
    try {
      const verificationToken = jsonwebtoken.verify(jwtToken[1], PUB_KEY, {
        algorithm: ["RSA256"],
      });
      req.jwt = verificationToken;

      next();
    } catch (err) {

      return res.status(401).json({ success: false, msg: "you are not authorized" });
    }
  } else {

    return res.status(401).json({ success: false, msg: "you are not authorized" });
  }
    console.log("error 5", req.jwt, req.jwt == undefined);
  if (!req.jwt || req.jwt === undefined || req.jwt ===null) {
    return false 
  }
};


module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;
