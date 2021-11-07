const express = require('express')
const db = require('../Models/index.js')

const router = express.Router();

router.delete("/api/todo/:uuid", async (req, res) => {
  try {
    const deletedTodo = await db.ToDo.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    res.send(deletedTodo);
    await deletedTodo.destroy();
    
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router
