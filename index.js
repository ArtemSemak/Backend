const express = require('express')
const recursive = require('recursive-readdir-sync')
const dotenv = require('dotenv')


dotenv.config()


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
