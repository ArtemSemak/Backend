const express = require("express");
const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    if (!req.body.login || !req.body.password) {
      res.send("Invalid fields in request");
      return;
    }

    const user = await db.User.findAll({
      where: {
        login: req.body.login,
      },
    });
    hash = user[0].dataValues.password;

    if (user.length === 0) {
      res.send("User not found");
      return;
    }
    bcrypt.compare(req.body.password, hash, (err, valid) => {
      if (err) return res.sendStatus(500);

      if (!valid) res.sendStatus(401);
      const token = jwt.encode(
        { login: req.body.login },
        process.env.SECRET_KEY
      );
      res.send(token);
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
