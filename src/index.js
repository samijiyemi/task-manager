const express = require("express");
const bodyParser = require("body-parser");
require("./db/mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// use income json request

// User Routes
const userRouter = require("./routers/users");
// Task Routes
const taskRouter = require("./routers/tasks");

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Ready✅");
});

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "abcd1234" }, "thisismysecerettoken", {
    expiresIn: "7 days",
  });
  console.log(token);

  // verify the token
  const data = jwt.verify(token, "thisismysecerettoken");
  console.log(data);
};

myFunction();
