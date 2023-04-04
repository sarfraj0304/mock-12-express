const express = require("express");
const cors = require("cors");
const { UserRouter } = require("./routes/UserRoutes");
const { InvestmentRouter } = require("./routes/InvestmentRoutes");

const app = express();
app.use(cors());
require("dotenv").config();
const { connection } = require("./db");
app.use(express.json());

app.use("/user", UserRouter);
app.use("/calculate", InvestmentRouter);

app.listen(4500, async () => {
  try {
    await connection;
    console.log("DB is Connected");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is connected");
});
