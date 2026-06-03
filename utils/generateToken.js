const jwt = require("jsonwebtoken");

const generateToken = (id) => {

  //    console.log(
  //   "JWT",
  //   process.env.JWT_SECRET
  // );

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = generateToken;



