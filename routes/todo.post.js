import express from "express";
import ToDo from "../Models/todoModel.js";

const router = express.Router();

router.post("/api/todo", async (req, res) => {
  try {
    const test = ToDo.build({ name: req.body.name });
    await test.save();
    res.send(test);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
