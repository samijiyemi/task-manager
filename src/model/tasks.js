/*
@params {sting} 
*/
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = new schema({
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

taskSchema.pre("save", async function (next) {
  const task = this;
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
