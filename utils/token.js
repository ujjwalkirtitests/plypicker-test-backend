const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, SECRET, { expiresIn: "1800ssss" });
}

module.exports = { generateAccessToken };
