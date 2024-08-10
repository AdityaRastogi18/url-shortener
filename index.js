const express = require("express");
const path = require("path");
const { connectMongoDb } = require("./connection");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");

// Connection
connectMongoDb(
  "mongodb://127.0.0.1:27017/shorten-urls?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15"
).then(() => console.log("mongodb connected"));

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extends: false }));
app.use(express.json());

app.use("/url", urlRouter);
app.use("/", staticRouter);

app.listen(3001, () => {
  console.log("server has started");
});
