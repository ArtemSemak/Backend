import express, { json } from "express";
import recursive from "recursive-readdir-sync";
import { Sequelize } from "sequelize";
import ToDo from "./Models/todoModel.js";

const sequelize = new Sequelize("postgres://test:test@127.0.0.1:5432/tododb");

try {
  await sequelize.authenticate();
  await ToDo.sync();
  console.log("Соединение с БД было успешно установлено");
} catch (e) {
  console.log("Невозможно выполнить подключение к БД: ", e);
}

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
recursive("./routes").forEach(async (file) => {
  const route = await import(`./${file}`);
  app.use("/", route.default);
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
