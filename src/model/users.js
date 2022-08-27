const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("./tasks");

// User Schema
const userSchema = new mongoose.Schema(
  {
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

// setting up virtual
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "author",
});

// Public Profile Method
userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Json web token methods for user authentication
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "jwtsecret");

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("invalid login details");
  }

  const isMatch = await bcrypt.compare(password, user.password);

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

userSchema.pre("remove", async function (next) {
  const user = this;

  await Task.deleteMany({ author: user._id });

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
