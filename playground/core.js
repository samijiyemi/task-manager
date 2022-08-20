const path = require("path");
const { log } = require("util");
const { getHeapStatistics } = require("v8");

const print = log;

const username = "ogbenisamu";

log(path.basename(__filename));
log("the name of the current file");

log(getHeapStatistics());

log(username);

print("hello, world");
