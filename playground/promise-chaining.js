require("../src/db/mongoose");
const User = require("../src/model/users");

const _id = "62ff775da2e5e639ded5a4d2";

User.findByIdAndUpdate(_id, { age: 100, name: "ogbenisamu" })
  .then((user) => {
    console.log("User", user);
    return User.countDocuments({ age: 100 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
