const print = console.log;

class Application {
  constructor(packageName, instance, port) {
    this.packageName = packageName;
    this.instance = packageName();
    this.port = port;
  }

  startServer() {
    this.instance.listen(this.port, () => {
      print(`server runing on port: ${this.port}`);
    });
  }

  routeHandling() {
    this.instance.get("/", (req, res) => {
      res.json({ name: "Ijiyemi Samuel Write this package!" });
    });
  }
}

const server = new Application(require("express"), this.instance, 3000);
server.startServer();
server.routeHandling();
