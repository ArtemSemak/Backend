import express from "express";
import fs from "fs";
import { writeIntoFile } from '../helper.js'

const filePath = "ToDos.json";
const router = express.Router();

router.post("/", (req, res) => {
  if (req.body.name === undefined || Object.keys(req.body).length > 1) {
    res.status(422).send("Invalid fields in request");
    return;
  }
  const todoId = Number(new Date());
  const name = req.body.name;
  const date = `${new Date().getDate()}.${
    new Date().getMonth() + 1
  }.${new Date().getFullYear()}`;
  let todos = [];
  const todo = {
    uuid: todoId,
    name: name,
    done: false,
    createdAt: date,
  };

  fs.readFile(filePath, "utf-8", (err, content) => {
    todos = JSON.parse(content);
    todos.push(todo);
    res.send(todo);
    writeIntoFile(todos)
  });
});

export default router;
