const express = require("express");
const recursive = require("recursive-readdir-sync");
const db = require("./models/index.js");
const dotenv = require("dotenv");
const jwt = require("jwt-simple");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
// app.options('*', (req,res) => { res.sendStatus(200); });
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
  
  next();
});
// app.use("/api", async (req, res, next) => {
//   try {
//     if (!req.headers["x-auth"]) return res.sendStatus(401);

//     const login = jwt.decode(
//       req.headers["x-auth"],
//       process.env.SECRET_KEY
//     ).login;

//     const user = await db.User.findAll({
//       where: { login: login },
//     });
//     console.log(user)
//     if (user.length === 0) {
//       console.log(1);
//       return res.sendStatus(401);
//     }
//     next();
//   } catch (e) {
    
//     res.sendStatus(401);
//   }
// });

recursive("./routes").forEach(async (file) => {
  const route = await import(`./${file}`);
  app.use("/", route.default);
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
