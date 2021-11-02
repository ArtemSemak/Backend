import express, { json } from "express";
import todosGet from "./routes/todos.get.js";
import todoPost from "./routes/todo.post.js";
import todoDelete from "./routes/todo.delete.js";
import todoPut from "./routes/todo.put.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api/todo", todoPost);
app.use("/api/todo", todoDelete);
app.use("/api/todo", todoPut);
app.use("/api/todos", todosGet);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
