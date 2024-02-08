const express = require("express");
require("dotenv").config();
const posts = require("./data/index");
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json(posts);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
