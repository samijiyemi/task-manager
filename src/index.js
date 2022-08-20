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
app.post("/user", async (req, res) => {
  // create new user
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(404).send(e);
  }
});

// get all users in the database
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(404).send(e);
  }
});

// get specific user
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send(`user with the ${_id} not found!`);
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("internal server error");
  }
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
