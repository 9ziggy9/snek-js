const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");

// Load environment defined in .env into process
dotenv.config();
const {PORT} = process.env;

// Allow JSON requests to API.
app.use(express.json());

// Serve game and its assets
app.use(express.static(path.join(__dirname, "client")));

app.get("/hello", (req,res) => {
  console.log("Received a request!");
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
