const express = require("express");
const User = require("../model/users");

const router = express.Router();

// create a new user resource creation
router.post("/", async (req, res) => {
  // create new user
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Endpoint for use login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findUserbyCredentials(
      req.body.email,
      req.body.password
    );

    res.send(user);
  } catch (e) {}
});

// get all users in the database
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
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
  const allowUpdates = ["name", "age", "email", "password"];
  const isValidOperation = updates.every((update) => {
    const check = allowUpdates.includes(update);
    return check;
  });

  // console.log(isValidOperation);

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid update" });
  }

  try {
    const user = await User.findById(req.params.id);

    updates.forEach((item) => {
      user[item] = req.body[item];
    });

    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
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
