const express = require("express");
const router = express.Router();

const User = require("../model/users");

// create a new user resource creation
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(404).send(e);
  }
});

// get specific user
router.get("/:id", async (req, res) => {
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

// Update a user in the database
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["age", "name", "email", "password"];
  const allowedOperations = updates.every((update) => {
    allowUpdates.includes(update);
  });

  if (!allowedOperations) {
    res.status(404).send({ error: "invalid update" });
  }

  try {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!users) {
      return res.status(404).send("user not found!");
    }

    res.status(200).send(users);
  } catch (e) {
    res.status(500).send("internal server error");
  }
});

// Endpoint to delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
