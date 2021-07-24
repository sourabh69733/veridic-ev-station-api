const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const AdminSchema = mongoose.model("AdminSchema");

const utils = require("../lib/utils");

// Error message is common
const error_message =
  `There may be problems with bearer token or user id or password or username. 
  It could be due to server, please try again and email us. `;

/**
 * --------------------Middleware for handling user registere, login, reset password, reset username--------------
 */
/**
 * @params username, password
 * @returns bearer token
 * middleware for saving user details
 */
router.post("/register", function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);
//   let newUser;
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  if (req.body.isAdmin){
    var newUser = new AdminSchema({
      adminname: req.body.adminname,
      hash: hash,
      salt: salt,
    });
  }
  else {
    var newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
    });
  }

  newUser
    .save()
    .then((user) => {
      const jwt = utils.issueJWT(user);
      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    })
    .catch((err) => next(err));
});

/**
 * @param username, bearer token at authorization header and password
 * middleware to process login
 */
router.post("/login", function (req, res, next) {

  if (req.body.isAdmin){
        AdminSchema.findOne({ adminname: req.body.adminname })
          .then((user) => {
            if (!user) {
              return res
                .status(401)
                .json({ success: false, msg: "could not get admin" });
            }
            const isValid = utils.validPassword(
              req.body.password,
              user.hash,
              user.salt
            );

            if (isValid) {
              const tokenObject = utils.issueJWT(user);

              return res.status(200).json({
                success: true,
                msg: "Successflly login user " + req.body.adminname,
                admin: user,
                token: tokenObject.token,
                expiresIn: tokenObject.expires,
              });
            } else {
              return res.status(403).json({
                success: false,
                msg:
                  "your password is wrong, please correct it " +
                  req.body.adminname,
              });
            }
          })
          .catch((err) => err);

  }
  else {
        User.findOne({ username: req.body.username })
          .then((user) => {
            if (!user) {
              return res
                .status(401)
                .json({ success: false, msg: "could not get user" });
            }
            const isValid = utils.validPassword(
              req.body.password,
              user.hash,
              user.salt
            );

            if (isValid) {
              const tokenObject = utils.issueJWT(user);

              return res.status(200).json({
                success: true,
                msg: "Successflly login user " + req.body.username,
                user: user,
                token: tokenObject.token,
                expiresIn: tokenObject.expires,
              });
            } else {
              return res.status(403).json({
                success: false,
                msg:
                  "your password is wrong, please correct it " +
                  req.body.username,
              });
            }
          })
          .catch((err) => err);
  }

});

/**
 * Logout route, only authenticated user can logout
 */
router.get("/logout", utils.authMiddleware, (req, res, next) => {
  req.logout();
});

/**
 * @param old_password, new_password and user id
 * reset password middleware, only allow after login, password authorization and
 */
router.post(
  "/reset-password/authenticate/:id",
  utils.authMiddleware,
  function (req, res, next) {
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;

    if (!old_password || !new_password) {
      return res.status(401).json({
        msg: "Please pass the required passwords",
      });
    }

    if (req.body.isAdmin) {
      var all_auth = AdminSchema;
    } else {
      var all_auth = User;
    }
    all_auth
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ success: false, msg: "could not get user" });
        }

        const isValid = utils.validPassword(old_password, user.hash, user.salt);
        if (!isValid) {
          //We can do to logout here, as user someone fake try to change password from original user.
          return res.status(403).json({
            success: false,
            msg: "user is not authenticated for reset password",
          });
        }

        const new_saltHash = utils.genPassword(new_password);
        const new_salt = new_saltHash.salt;
        const new_hash = new_saltHash.hash;
        user.hash = new_hash;
        user.salt = new_salt;

        user
          .save()
          .then((user) => {
            return res.status(200).json({
              success: true,
              msg:
                "Your password reset successfully for username " +
                  (user.adminname || user.username),
            });
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
);

/**
 * @param new_username, password and user id
 * only allowed after login and autheticated, only funtions is Changing username
 */
router.post(
  "/reset-username/authenticate/:id",
  utils.authMiddleware,
  function (req, res, next) {
    const password = req.body.password;
    const new_username = req.body.new_username;

    if (!password || !new_username) {
      return res.status(401).json({
        msg: "Please pass the required passwords",
      });
    }

    if (req.body.isAdmin) {
      var all_auth = AdminSchema;
    } else {
      var all_auth = User;
    }

    all_auth
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ success: false, msg: "could not get user" });
        }

        const isValid = utils.validPassword(password, user.hash, user.salt);
        if (!isValid) {
          //We can do to logout here, as user someone fake try to change password from original user.
          return res.status(403).json({
            success: false,
            msg: "user is not authenticated for reset username",
          });
        }

        if (user.username) {
          user.username = new_username;
        } else {
          user.adminname = new_username;
        }

        user
          .save()
          .then((user) => {
            return res.status(200).json({
              success: true,
              msg: `Your username reset successfully to ${
                user.username || user.adminname
              }`,
            });
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
);

module.exports = router;

/**
 * username
 * hash, salt
 * role  -- endUser, admin, webadmin, developer
 * permission -- add products, view products
 */