/*
@params {sting} 
*/
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
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
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
