import express from "express";
import { readFromFile, writeIntoFile } from '../helper.js'

const filePath = "ToDos.json";
const router = express.Router();

router.delete("/api/todo/:uuid", (req, res) => {
  try {
  const uuid = req.params.uuid;
  readFromFile(filePath, (todos) => {
    if (todos === []) {
        res.status(404).send("Task not found");
        return;
      }
      let filteredTodos = todos.filter((todo) => todo.uuid !== uuid);
      console.log(filteredTodos, todos);
      if (filteredTodos.length === todos.length) {
        res.status(404).send("Task not found");
        return;
      }
        writeIntoFile(filteredTodos)
        res.send(filteredTodos);
        
      })} catch(e) {
        res.status(500).send("Something went wrong")
      }
  
});

export default router;
