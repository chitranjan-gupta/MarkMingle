const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    if (!token) {
      res.status(401).json({ message: "Unauthorized:No token provided" });
      return;
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const WUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!WUser) {
      res.status(404).json({ message: "No User Found" });
      return;
    }
    const user = {
      id: WUser.id,
    };
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = authenticate;
