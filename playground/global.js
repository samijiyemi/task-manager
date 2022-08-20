const readline = require("readline");
const { log } = require("util");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("do you like programming? ", (answer) => {
  log(`your answer is: ${answer}`);
  process.exit();
});
