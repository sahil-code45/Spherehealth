const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    console.log("Protect Middleware Hit");
    console.log("Authorization Header:", req.headers.authorization);
  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
      
    ) {
      console.log("dararaaaaaaaaaaaaa",req.headers.authorization);

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded.id;    

      next();
      

    } else {
      res.status(401).json({
        message: "Not authorized",
      });
    }

  } catch (error) {
    res.status(401).json({
      message: "Token failed",
    });
  }
};

module.exports = protect;