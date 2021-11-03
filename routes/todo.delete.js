import express from "express";
import ToDo from "../Models/todoModel.js";

const router = express.Router();

router.delete("/api/todo/:uuid", async (req, res) => {
  try {
    const deletedTodo = await ToDo.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    res.send(deletedTodo);
    await deletedTodo.destroy();
    
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
