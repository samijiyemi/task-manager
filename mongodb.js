/** @format */
const mongodb = require("mongodb");
const { MongoClient, ObjectID } = mongodb;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to the database");
    }

    const db = client.db(databaseName);
    // delete document
    db.collection("tasks")
      .deleteMany({
        title: "Learn Photoshop",
      })
      .then((result) => {
        console.log("Task deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
