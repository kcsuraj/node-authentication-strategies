const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const basicAuth = require("./middleware/basicAuth");

dotenv.config({ path: ".env" });

// Create Express server
const app = express();

app.get("/users", basicAuth, (req, res, next) => {
  return res.status(200).json({ message: "authentication successful" });
});

// Connect to MongoDB database
mongoose
  .connect(`${process.env.DB_URI}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {})
  .catch((err) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
  });

app.set("port", process.env.PORT || 5200);

module.exports = app;
