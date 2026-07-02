const jwt = require("jsonwebtoken");
const user=require("../models/user.model");

async function isLoggedIn(req, res, next) {
  try {
    const accessToken=req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        message: "User not logged in. Please login to continue",
      });
    }
     
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const currUser = await user.findById(decoded.id);
    req.user = currUser;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Session expired. Please login to continue",
    });
  }
}

module.exports = { isLoggedIn };
