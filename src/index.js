const express = require("express");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

// use income json request
app.use(express.json({ urlencoded: true }));

// User Routes
const userRouter = require("./routers/users");
app.use("/users", userRouter);

// Task Routes
const taskRouter = require("./routers/tasks");
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log("server is up on port " + port);
});
