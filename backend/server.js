const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Allow variables to be read from a .env file
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Compass Connection Successful.");
});

const projectsRouter = require("./routes/projects");
app.use("/projects", projectsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
