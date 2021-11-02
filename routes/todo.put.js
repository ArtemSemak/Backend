import express from "express";
import fs from "fs";
import { writeIntoFile } from '../helper.js'

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
  let todos = [];
  fs.readFile(filePath, "utf-8", (err, content) => {
    todos = JSON.parse(content);
    todos = todos.map((todo) => {
      if (String(todo.uuid) === uuid) {
        todo.name = name;
        todo.done = done;
      }
      return todo;
    });
    res.send(todos);
    writeIntoFile(todos)
  });
});

export default router;
