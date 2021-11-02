import express from "express";
import fs from "fs";
import { writeIntoFile } from "../helper.js";

const filePath = "ToDos.json";
const router = express.Router();

router.delete("/:uuid", (req, res) => {
  const uuid = req.params.uuid;
  let todos = [];
  fs.readFile(filePath, "utf-8", (err, content) => {
    if (content === "") {
      res.status(404).send("Task not found");
      return;
    }
    todos = JSON.parse(content);
    let filteredTodos = todos.filter((todo) => String(todo.uuid) !== uuid);
    console.log(filteredTodos, todos);
    if (filteredTodos.length === todos.length) {
      res.status(404).send("Task not found");
      return;
    }
    res.send(filteredTodos);
    writeIntoFile(filteredTodos);
  });
});

export default router;
