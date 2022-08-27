const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const Task = require("../model/tasks");

// create a new task resource
router.post("/", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    author: req.user._id,
  });

  // save task into the database
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Endpoint for fetching all tasks
router.get("/", auth, async (req, res) => {
  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        sort: {
          completed: -1,
        },
      },
    });

    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send("intenal server error");
  }
});

// Endpoint for fetching task by id
router.get("/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, author: req.user._id });

    console.log(req.user);

    if (!task) {
      return res.status(404).send(`task with the id of ${_id} not found!`);
    }

    res.status(200).send(task);
  } catch (e) {
    res.status(500).send("internal server error!");
  }
});

// update a taks in the database
router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["description", "completed"];
  const isValidOperations = updates.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isValidOperations) {
    return res.status(400).send({ error: "invalid update" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((item) => {
      task[item] = req.body[item];
    });

    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete task by given id
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
