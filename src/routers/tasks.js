const express = require("express");
const router = express.Router();

const Task = require("../model/tasks");

// create a new task resource
router.post("/", async (req, res) => {
  // create new task
  const task = new Task(req.body);

  // save task into the database
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Endpoint for fetching all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks) {
      return res.status(404).send("No tasks found!");
    }
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send("intenal server error");
  }
});

// Endpoint for fetching task by id
router.get("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send(`task with the id of ${_id} not found!`);
    }

    res.status(200).send(task);
  } catch (e) {
    res.status(500).send("internal server error!");
  }
});

// update a taks in the database
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["description", "completed"];
  const isValidOperations = updates.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isValidOperations) {
    return res.status(400).send({ error: "invalid update" });
  }

  try {
    const task = await Task.findById(req.params.id);

    updates.forEach((item) => {
      task[item] = req.body[item];
    });

    await task.save();

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete task by given id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send("done");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
