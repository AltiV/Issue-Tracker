// "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
const express = require("express");
// "CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options."
const cors = require("cors");
// "The path module provides utilities for working with file and directory paths."
const path = require("path");
// "Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks."
const mongoose = require("mongoose");

// Allow variables to be read from a .env file, which is loaded into process.env
// Also set the path so server.js can be properly run outside of its directory
require("dotenv").config({ path: "./backend/.env" });

// Create Express application inside the app variable via constructor
const app = express();
// Set port variable to 5000 by default, which will assigned something else (random?) when run by web server that handles it
const port = process.env.PORT || 5000;

// Enable All CORS (Cross-Origin Resource Sharing) Requests
app.use(cors());
// Enable sending data to server via JSON objects (not required for GET/DELETE requests)
app.use(express.json());

// Set MongoDB connection string from .env file
const uri = process.env.ATLAS_URI;

// Connect backend to MongoDB cluster
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Execute opening of connection (once only)
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Compass Connection Successful.");
});

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });
}

// Include projects.js route module
const projectsRouter = require("./routes/projects");
// Specify middleware as callback function
app.use("/projects", projectsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
