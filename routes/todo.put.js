import express from "express";
import { readFromFile, writeIntoFile } from '../helper.js'

const filePath = "ToDos.json";
const router = express.Router();

router.put("/:uuid", (req, res) => {
  const uuid = req.params.uuid;
  const name = req.body.name;
  const done = req.body.done;
  if (
    name === undefined ||
    done === undefined ||
    Object.keys(req.body).length > 2
  ) {
    res.status(422).send("Invalid fields in request");
    return;
  }
  readFromFile(filePath, (todos) => {
    todos = todos.map((todo) => {
        if (String(todo.uuid) === uuid) {
          todo.name = name;
          todo.done = done;
        }
        return todo;
      });
      try {
        writeIntoFile(todos)
        res.send(todos);
        } catch(e) {
            res.status(500).send('Something went wrong')
        }
  })
});

export default router;
