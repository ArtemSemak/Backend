import express from "express";
import ToDo from "../Models/todoModel.js";

const router = express.Router();


router.get("/api/todos", async (req, res) => {
  try {
    let filterBy;
    switch (req.query.filterBy) {
      case "all":
        filterBy = [true, false];
        break;
      case "done":
        filterBy = true;
        break;
      case "undone":
        filterBy = false;
        break;
    }
    const todos = await ToDo.findAll({
      where: {
        done: filterBy,
      },
      order: [["createdAt", `${req.query.order}`]],
    });
    res.send(todos);
  } catch (e) {
    res.status(500).send("Invalid request");
  }
});

export default router;
