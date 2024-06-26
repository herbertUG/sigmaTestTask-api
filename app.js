require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const cors = require('cors');

const authRouter = require("./route/authRoute");
const candidateRouter = require("./route/candidateRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const { stack } = require("sequelize/lib/utils");
const globalErrorHandler = require("./controller/errorController");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/candidates", candidateRouter);

// handle route not found
app.use('*', catchAsync(async(req, res, next) => {
  throw new AppError('Route not found', 404);
}));

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
