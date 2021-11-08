const express = require("express");
const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

const router = express.Router();

router.post("/registration", async (req, res) => {
  try {
    if (!req.body.login || !req.body.password) {
      res.send("Invalid fields in request");
      return;
    }
    let newUser = {};
    newUser.login = req.body.login;
    let password = req.body.password;

    bcrypt.hash(password, 10, async (err, hash) => {
      newUser.password = hash;

      try {
        await db.User.create(newUser);
        res.send("User created!");
      } catch (e) {
        res.send(e);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
