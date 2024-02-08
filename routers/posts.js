const router = require("express").Router();
const posts = require("../data/index");
const { authenticateToken } = require("../middleware/token");

router.get("/", authenticateToken, (req, res) => {
  res.status(200).json(posts);
});

module.exports = router;
