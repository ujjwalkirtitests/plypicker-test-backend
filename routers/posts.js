const router = require("express").Router();
const posts = require("../data/index");

router.get("/", (req, res) => {
  res.status(200).json(posts);
});

module.exports = router;
