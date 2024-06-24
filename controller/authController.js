const user = require("../db/models/user");
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  const newUser = await user.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const result = newUser.toJSON();
  delete result.password;

  result.token = generateToken({
    id: result.id,
  });

  return res.status(201).json({
    message: "User created successfully",
    status: "success",
    data: result,
  });
};

const login = async (req, res, next) => {
  res.json({
    message: "Login successful",
    status: "success",
  });
};

module.exports = { signup, login };
