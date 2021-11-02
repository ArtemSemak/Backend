import express from "express";
import { readFromFile } from "../helper.js";


const router = express.Router();
const filePath = "ToDos.json";

router.get("/api/todos", (req, res) => {
  readFromFile(filePath, (todos) => {
    if (todos === []) {
        res.send([]);
        return;
      }
      if (req.query.filterBy === "done") {
        todos = todos.filter((todo) => todo.done === true);
      }
      if (req.query.filterBy === "undone") {
        todos = todos.filter((todo) => todo.done === false);
      }
  
      if (req.query.order === "asc") {
        todos.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
      }
      if (req.query.order === "desc") {
        todos.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      }
      console.log(Date.parse("2021-11-02T14:34:42.482Z"));
  
      res.send(todos);
  })

});

export default router;
