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
      return next(new AppError('Please provide email and password', 400));
  }

  const result = await user.findOne({ where: { email } });
  if (!result || !(await bcrpyt.compare(password, result.password))) {
      return next(new AppError('Incorrect email or password', 401));
  }

  const token = generateToken({
      id: result.id,
  });

  return res.json({
      status: 'success',
      token,
  });
});

const authentication = catchAsync(async (req, res, next) => {
  let idToken = '';
  if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
  ) {
      idToken = req.headers.authorization.split(' ')[1];
  }
  if (!idToken) {
      return next(new AppError('Please login to get access', 401));
  }
  const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
  const freshUser = await user.findByPk(tokenDetail.payload.id);
  console.log(tokenDetail);

  if (!freshUser) {
      return next(new AppError('User no longer exists', 400));
  }
  req.user = freshUser;
  return next();
});

module.exports = { signup, login, authentication };
