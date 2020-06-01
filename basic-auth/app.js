const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const basicAuth = require("./middleware/basicAuth");

dotenv.config({ path: ".env" });

console.log(process.env.dbURI);

// Create Express server
const app = express();

app.get("/users", basicAuth);

// Connect to MongoDB database
mongoose
  .connect(`${process.env.DB_URI}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
  });

app.set("port", process.env.PORT || 5200);

module.exports = app;
