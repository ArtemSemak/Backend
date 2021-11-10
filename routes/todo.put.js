const express = require('express')
const db = require('../models/index.js')

const router = express.Router();

router.put("/api/todo/:uuid", async (req, res) => {
  try {
    const editedTodo = await db.ToDo.update(
      {
        name: req.body.name,
        done: req.body.done,
      },
      {
        where: {
          uuid: req.params.uuid,
          owner: res.locals.login
        },
      }
    );
    res.send(editedTodo);
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
});

module.exports = router
