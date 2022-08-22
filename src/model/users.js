const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Input must be a positive number");
      }
    },
  },
  email: {
    type: String,
    unique: true,
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
    validate(value) {
      if (value.includes("password")) {
        throw new Error(`Password must not include 'password'`);
      }
    },
  },
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("invalid login details");
  }


  console.log(user.password)

  const isMatch = await bcrypt.compare(
    password,
    "$2a$10$0ukuuyhk8b33zmxd/xgu8efbv1zkycijhgl1kj3rk2ln6z8ux6coy"
  );
  console.log(isMatch);

  if (!isMatch) {
    throw new Error("incorrect password");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
