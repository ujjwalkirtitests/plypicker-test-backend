const express = require("express");
require("dotenv").config();
const postRouter = require("./routers/posts");
const userRouter = require("./routers/users");
const { connectToDB } = require("./db/init");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

connectToDB();

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
