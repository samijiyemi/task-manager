/** @format */
const mongoose = require("mongoose");

// connect to the mongoose database
mongoose.connect(
  "mongodb://127.0.0.1:27017/task-manager-api",
  (err, resultData) => {
    if (err) {
      throw new Error("Unable to connect to the database");
    }

    console.log(resultData.name, "Database connected successfully!");
  }
);
