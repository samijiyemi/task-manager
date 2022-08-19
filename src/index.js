const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// create resource creation

app.listen(port, () => {
  console.log("server is up on port " + port);
});
