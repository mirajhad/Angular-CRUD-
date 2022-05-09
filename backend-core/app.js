const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");

dotenv.config({
  path: "./config.env",
});
require("./db/conn");

app.use(cors());

app.use(express.json());

app.use(require("./routes/router"));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
