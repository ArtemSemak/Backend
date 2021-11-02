import express from "express";
import { readFromFile, writeIntoFile } from '../helper.js'
import { v4 as uuidv4 } from 'uuid';

const filePath = "ToDos.json";
const router = express.Router();

router.post("/", (req, res) => {
  if (req.body.name === undefined || Object.keys(req.body).length > 1) {
    res.status(422).send("Invalid fields in request");
    return;
  }
  
  const todo = {
    uuid: uuidv4(),
    name: req.body.name,
    done: false,
    createdAt: new Date(),
  };
  readFromFile(filePath, (todos) => {
    todos.push(todo);
    try {
    writeIntoFile(todos)
    res.send(todo);
    } catch(e) {
        res.status(500).send('Something went wrong')
    }
  })
  
});

export default router;
