const mongoose = require("mongoose");
const validator = require("validator");

// User Schema
const userSchema = new mongoose.Schema({
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

userSchema.pre("save", function (next) {
  const user = this;

  user.name = "Sam Ijiyemi";

  console.log(user.name);

  console.log("just before saving");

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
