const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await user.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  if (!newUser) {
    return next(new AppError("User not created", 400));
  }

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
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const result = await user.findOne({
    where: {
      email: email,
    },
  });
  if (!result || (await bcrpyt.compareSync(password, result.password))) {
    return res.status(404).json({
      message: "Invalid email or password",
      status: "error",
    });
  }

  const token = generateToken({
    id: result.idres,
  });

  return res.json({
    status: "success",
    token,
  });
});

module.exports = { signup, login };
