const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const sqlite3 = require("sqlite3");

// Open bindings to database!
const db = new sqlite3.Database("./db/snek.db", err => {
  if (err) throw new Error(err.message);
  console.log("Connected to database successfully.");
});

// Create a scores table if it does not exist.
const sql_table_score = `CREATE TABLE IF NOT EXISTS Score (
  id INTEGER PRIMARY KEY,
  user TEXT NOT NULL,
  score INTEGER NOT NULL
)`;

// SERIALIZATION ENFORCES SYNCHRONICITY, otherwise there is no guarnatee
// that previous command was executed successfully and/or completed
db.serialize(() => {
  db.run(sql_table_score, (err) => {
    if (err) console.error(err.message);
  });
});

// Initiailize express application
const app = express();

// Load environment defined in .env into process
dotenv.config();
const {PORT} = process.env;

// Allow JSON requests to API.
app.use(express.json());

// Serve game and its assets
app.use(express.static(path.join(__dirname, "client")));

app.get("/hello", (req,res) => {
  res.json({"hello": "world"});
});

app.post("/hello", (req,res) => {
  const {user, score} = req.body;
  const sql_insert_score = `INSERT INTO Score (user,score)
    VALUES ("${user}", "${score}")`;

  // DATABSE SIDE-EFFECT!
  db.serialize(() => {
    db.run(sql_insert_score, (err) => {
      if (err) console.error(err.message);
    });
  });

  res.json({user, score});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
