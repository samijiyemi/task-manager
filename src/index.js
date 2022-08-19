const express = require("express");
require("./db/mongoose");

// Import User model
const User = require("./model/users.js");

// Import Task model
const Task = require("./model/tasks.js");

const app = express();
const port = process.env.PORT || 3000;

// use income json request
app.use(express.json({ urlencoded: true }));

// create a new user resource creation
app.post("/user", (req, res) => {
  // create new user
  const newUser = new User(req.body);

  // save new user into the database
  newUser
    .save()
    .then((result) => {
      return res.send(newUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// get all users in the database
app.get("/users", (req, res) => {
  const getAllUsers = User.find({});
  getAllUsers
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// get specific user
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found!");
      }

      res.send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// create a new task resource
app.post("/task", (req, res) => {
  // create new task
  const task = new Task(req.body);

  // save task into the database
  task
    .save()
    .then((value) => {
      res.send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Endpoint for fetching all tasks
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("task not found!");
      }
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(500).send("Internal server error");
    });
});

// Endpoint for fetching task by id
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }

      res.status(200).send(task);
    })
    .catch((err) => {
      res.status(500).send("Internal server error");
    });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
