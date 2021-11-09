const express = require('express')
const { uuid } = require('uuid');
const db = require('../models/index.js')

const router = express.Router();

router.post("/api/todo/:owner", async (req, res) => {
  try {
    
    const newTodo = db.ToDo.build({  name: req.body.name, owner: req.params.owner });
    await newTodo.save();
    
    res.send(newTodo);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router
