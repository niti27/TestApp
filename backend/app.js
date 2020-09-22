
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const projectsRoutes = require("./routes/project");
const employeesRoutes = require("./routes/employee");
const logsRoutes = require("./routes/log");

const app = express();

mongoose
  .connect(
    "mongodb+srv://niti:niti123123@cluster0.nofvb.mongodb.net/test?retryWrites=true&w=majority",
      { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/projects",projectsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/logs", logsRoutes);

module.exports = app;
