const express = require("express");
const morgan = require("morgan");
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

app.use(morgan("combined"));

app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Ready on port " + port);
});
