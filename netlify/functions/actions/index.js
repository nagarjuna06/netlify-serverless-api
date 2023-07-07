require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const employeeRoute = require("./route");
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

app.use("/employees", employeeRoute);
app.get("/", (req, res) => {
  res.redirect("/employees");
});
module.exports.handler = serverless(app);
