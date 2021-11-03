import express from "express";
import ToDo from "../Models/todoModel.js";

const router = express.Router();

router.delete("/api/todo/:uuid", async (req, res) => {
  try {
    const test = await ToDo.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });

    await test.destroy();
    res.send(test);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
