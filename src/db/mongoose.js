/** @format */
const print = console.log;
const mongoose = require("mongoose");
const validator = require("validator");

// connect to the database
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

// create new User Model
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Input must be a positive number");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    lowercase: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error(`Password must not include 'password'`);
      }
    },
  },
});

// Define the Task Model
const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!value) {
        throw new Error("description must not be empty!");
      }
    },
  },
  completed: { type: Boolean, default: false },
});

// create instance of the user database
// const sam = new User({
//   name: "   Sam Ijiyemi   ",
//   email: "SAM@EDUBOXGLOBAL.ORG",
//   password: " samuel12345 ",
// })
//   .save()
//   .then((result) => {
//     print(result);
//   })
//   .catch((error) => {
//     print(error);
//   });

// create instance of the task database
const task = new Task({
  description: "Learn Figma",
})
  .save()
  .then((result) => {
    print(result);
  })
  .catch((err) => {
    print(err);
  });
