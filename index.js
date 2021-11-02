import express, { json } from "express";
import recursive from "recursive-readdir-sync";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
recursive('./routes')
    .forEach(async (file) => {
        let  test  = await import(`./${file}`)
        app.use('/', test.default)});


app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});



