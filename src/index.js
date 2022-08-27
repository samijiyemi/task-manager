const express = require("express");
const multer = require("multer");
require("./db/mongoose");

// Uploaded File Middleware
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please upload a word document..."));
    }

    cb(null, true);
  },
});

const app = express();
const port = process.env.PORT || 3000;

app.post("/upload", upload.single("upload"), (req, res) => {
  res.send("file uploaded sucessfully!");
});

// Allow incoming JSON from the body query
app.use(express.json());

// Route Handler for User
app.use("/users", require("./routers/users"));

// Route Handler for Task
app.use("/tasks", require("./routers/tasks"));

// Error Handler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log("Ready on port " + port);
});
