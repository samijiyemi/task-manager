const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/users");
const auth = require("../middleware/auth");

const router = express.Router();

// userValidation Helper
const { userAuth } = require("../../helper/userValidation");

// Endpoint to create a new user
router.post("/", async (req, res) => {
  try {
    // validate user input before saving into database
    const validateUser = await userAuth.validateAsync(req.body);

    if (!validateUser) {
      return res.status(400).json(validateUser.details[0].message);
    }

    let newUser = new User(validateUser);

    // check for existing user in the database before saving
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json(req.body.name + " already exists");
    }

    await newUser.save();

    const token = await newUser.generateAuthToken();

    res.status(200).send({ newUser, token });
  } catch (e) {
    res.status(400).json(e);
  }
});

// get all profile user in the database
router.get("/me", auth, async (req, res) => {
  res.send(req.user);
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
    res.status(400).send("internal server error");
  }
});

// Update a user in the database
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "age", "email", "password"];
  const isValidOperation = updates.every((update) => {
    const checkBodyRequest = allowUpdates.includes(update);
    return checkBodyRequest;
  });

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
      return res.status(400).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Endpoint for use login
router.post("/login", async (req, res) => {
  try {
    const userInDb = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await userInDb.generateAuthToken();

    if (!userInDb) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(req.body.password, userInDb.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({ userInDb, token });
  } catch (e) {
    res.status(404).send("Invalid details");
  }
});

// Endpoint to logout user
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send(`${req.user.name} Logout Successfully!`);
  } catch (e) {
    res.status(500).send();
  }
});

// Endpoint to delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    res.status(200).json({ message: "user deleted" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
