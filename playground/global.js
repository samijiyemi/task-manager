const print = console.log;

/**
 * @params {String} userRouter - Hadnlig all user request
 * @params {String} dbFile - Connect to the database and handling all database request
 */

class Application {
  static userRouter = require("../src/routers/users");
  static dbFile = require("../src/db/mongoose");
  constructor(packageName, instance, port) {
    this.packageName = packageName;
    this.instance = packageName();
    this.port = port;
  }
  // method to start the express server
  startServer() {
    this.instance.listen(this.port, () => {
      print(`server runing on port: ${this.port}`);
    });
  }
  // router hadler for default page
  routeHandling() {
    this.instance.get("/", (req, res) => {
      res.json({ name: "Ijiyemi Samuel Write this package!" });
    });
  }
  // Route fo user handler
  userHandler() {
    this.instance.use("/user", Application.userRouter);
  }
}

const server = new Application(require("express"), this.instance, 3000);
server.startServer();
server.routeHandling();
server.userHandler();
