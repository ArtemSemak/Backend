const express = require('express')
const db = require('../Models/index.js')

const router = express.Router();

router.post("/api/todo", async (req, res) => {
  try {
    const newTodo = db.ToDo.build({ name: req.body.name });
    await newTodo.save();
    res.send(newTodo);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router
