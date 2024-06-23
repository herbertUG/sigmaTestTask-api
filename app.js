require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const authRouter = require("./route/authRoute");

const app = express();

app.use("/api/v1/auth", authRouter);

// handle route not found
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found'
  })
});


const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
