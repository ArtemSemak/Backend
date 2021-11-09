const express = require('express')
const db = require('../models/index.js')



const router = express.Router();


router.get("/api/todos/:owner", async (req, res) => {
  try {
    
    const filterBy = {"owner": req.params.owner};
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
    if (req.query.filterBy === 'done' || req.query.filterBy === 'undone') 
      filterBy.done = req.query.filterBy === 'done' ? true : false;

    const todos = await db.ToDo.findAll({
      where: filterBy,
      order: [["createdAt", `${req.query.order === 'desc' ? 'desc' : 'asc'}`]],
    });
    res.send(todos);
  } catch (e) {
    console.log(e)
    res.status(500).send("Invalid request");
  }
});

module.exports = router
