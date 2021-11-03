import express from "express";
import ToDo from "../Models/todoModel.js";

const router = express.Router();

router.put("/api/todo/:uuid", async (req, res) => {
  try {
    const editedTodo = await ToDo.update(
      {
        name: req.body.name,
        done: req.body.done,
      },
      {
        where: {
          uuid: req.params.uuid,
        },
      }
    );
    res.send(editedTodo);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
