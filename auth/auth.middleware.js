const User = require("../models/userModel");

const {verifyToken} = require("./auth.method");

const isAuth = async (req, res, next) => {
  // Get access token from header
  const accessTokenFromHeader = req.headers.x_authorization;
  if (!accessTokenFromHeader) {
    return res.status(401).send("Access token not found!");
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const verified = await verifyToken(
    accessTokenFromHeader,
    accessTokenSecret
  );
  if (!verified) {
    return res.status(401).send("Not authenticated!");
  }

  const user = await User.findOne({ username: verified.payload.username });
  req.user = user;

  return next();
};

module.exports = isAuth;
