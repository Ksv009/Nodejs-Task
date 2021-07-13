const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.accessToken || req.query.accessToken || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, 'Gemini'); 
    req.decoded = decoded;
  } catch (err) {
    // return res.status(401).send("Invalid Token");
    
    // console.log(err);
    if (err.name == "TokenExpiredError") {
      return res.json(err);
    } else {
      return res.json(err);
    }
    //return res.status(403).json(result);
  }
  return next();
};

module.exports = verifyToken;