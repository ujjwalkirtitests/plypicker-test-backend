const router = require("express").Router();
const { pool } = require("../db/init");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utils/token");
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    body("password")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
      )
      .withMessage(
        "Password must be at least 8 characters long, contain a number, an uppercase letter, a lowercase letter, and a special character"
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    try {
      const { username, password } = req.body;

      // Check if user already exists
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);
      if (user.rows.length > 0) {
        return res.status(400).json("User already exists");
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert the new user into the database
      const newUser = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
      );

      //return the jwt based on username and secret
      const token = generateAccessToken({ username: req.body.username });
      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in database
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    // Check if user exists
    if (user.rows.length === 0) {
      return res.status(400).json("Invalid credentials");
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json("Invalid credentials");
    }

    // Generate and return token
    const token = generateAccessToken({ username });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;
