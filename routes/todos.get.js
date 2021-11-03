import express from "express";
import ToDo from "../Models/todoModel.js";

const router = express.Router();


router.get("/api/todos", async (req, res) => {
  try {
    
    const filterBy = {};
    // switch (req.query.filterBy) {
    //   case "all":
    //     filterBy = [true, false];
    //     break;
    //   case "done":
    //     filterBy = true;
    //     break;
    //   case "undone":
    //     filterBy = false;
    //     break;
    // }
    if (req.query.filterBy !== undefined) 
      filterBy.done = req.query.filterBy === 'done' ? true : false;

    const todos = await ToDo.findAll({
      where: {},
      order: [["createdAt", `${req.query.order === 'desc' ? 'desc' : 'asc'}`]],
    });
    res.send(todos);
  } catch (e) {
    console.log(e)
    res.status(500).send("Invalid request");
  }
});

export default router;
