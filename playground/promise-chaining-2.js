const { log } = require("util");
const print = log;
require("../src/db/mongoose.js");
const Task = require("../src/model/tasks");

const _id = "62ff8666cbf068a894fd206c";

// Task.findByIdAndDelete(_id)
//   .then((task) => {
//     if (!task) {
//       return log("task not found");
//     }
//
//     log("task deleted");
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     log(result);
//   })
//   .catch((err) => {
//     log(err);
//   });

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: true });
  return count;
};

deleteTaskAndCount(_id)
  .then((result) => {
    print(result);
  })
  .catch((err) => {
    print(err);
  });
