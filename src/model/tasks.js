/*
@params author ogbenisamu
*/
const mongoose = require("mongoose");

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

module.exports = Task;
