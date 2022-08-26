const express = require("express");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Allow incoming JSON from the body query
app.use(express.json());

// Route Handler for User
app.use("/users", require("./routers/users"));

// Route Handler for Task
app.use("/tasks", require("./routers/tasks"));

// Error hanlder
app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log("Ready on port " + port);
});
