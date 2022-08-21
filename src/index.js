const express = require("express");
require("./db/mongoose");
// User Routes
const userRouter = require("./routers/users");
// Task Routes
const taskRouter = require("./routers/tasks");

const app = express();
const port = process.env.PORT || 3000;

// use income json request
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server is up on port " + port);
});
