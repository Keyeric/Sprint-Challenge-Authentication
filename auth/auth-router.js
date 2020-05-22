const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

const model = require("./auth-model");

router.post("/register", (req, res) => {
  const body = req.body;

  model
    .findBy(body.username)
    .then((person) => {
      if (!person[0]) {
        if (
          body.username &&
          body.password &&
          typeof body.password === "string"
        ) {
          const rounds = process.env.BCRYPT_ROUNDS || 12;
          const hash = bcrypt.hashSync(body.password, rounds);
          body.password = hash;

          model
            .register(body)
            .then((newGuy) => {
              res.status(201).json(newGuy);
            })
            .catch((err) => {
              res.status(500).json({
                message: "server error hiring new employee",
                error: err,
              });
            });
        } else if (!body.username) {
          res.status(400).json({
            message: "Please add a name",
          });
        } else if (!body.password) {
          res.status(400).json({
            message: "Please add a password",
          });
        } else if (typeof body.password != "string") {
          res.status(400).json({
            message: "Password must be alphanumeric",
          });
        }
      } else {
        res.status(500).json({
          message: "That username is taken, please choose another",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "server error creating a new user",
        error: error,
      });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  model
    .findBy(username)
    .then(([guy]) => {
      if (guy && bcrypt.compareSync(password, guy.password)) {
        const token = generateToken(guy);

        res.status(200).json({
          message: `Welcome, ${guy.username}! Login Successful!`,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

function generateToken(guy) {
  const payload = {
    subject: guy.id,
    username: guy.user,
    department: guy.department,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
