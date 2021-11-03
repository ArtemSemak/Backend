import express from "express";
import ToDo from "../Models/todoModel.js";

const router = express.Router();

router.post("/api/todo", async (req, res) => {
  try {
    const newTodo = ToDo.build({ name: req.body.name });
    await newTodo.save();
    res.send(newTodo);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
