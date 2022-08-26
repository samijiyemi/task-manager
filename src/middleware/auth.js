const jwt = require("jsonwebtoken");
const User = require("../model/users");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, "jwtsecret");

    const findUserInDb = await User.findOne({
      _id: decode._id,
      "tokens.token": token,
    });

    if (!findUserInDb) {
      throw new Error();
    }

    req.token = token;
    req.user = findUserInDb;

    next();
  } catch (e) {
    res.status(401).send({ message: "Not Authorize" });
  }
};

module.exports = auth;
