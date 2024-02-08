const express = require("express");
require("dotenv").config();
const posts = require("./data/index");
const postRouter = require("./routers/posts");
const PORT = process.env.PORT || 3000;

const app = express();

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
