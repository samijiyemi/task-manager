const { log } = require("util");
const print = log;
require("../src/db/mongoose");
const User = require("../src/model/users");

const _id = "62ff775da2e5e639ded5a4d2";

// User.findByIdAndUpdate(_id, { age: 100, name: "ogbenisamu" })
//   .then((user) => {
//     console.log("User", user);
//     return User.countDocuments({ age: 100 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount(_id, 2)
  .then((count) => {
    print(count);
  })
  .catch((err) => {
    print(err);
  });
