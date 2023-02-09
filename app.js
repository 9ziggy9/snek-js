const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const PORT = process.argv[2] || 8080;

const db = new sqlite3.Database("./db/main.db", err => {
  if (err) throw new Error(err.message);
  console.log("Connected to database successfully.");
});

const sql_table_score = `CREATE TABLE IF NOT EXISTS Score (
  id INTEGER PRIMARY KEY,
  player VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL
);`;

const sql_select_scores = `SELECT * FROM Score
  ORDER BY score DESC LIMIT 10;`;

db.run(sql_table_score, (err) => {
  if (err) console.error(err.message);
});

// Initializing express.
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

app.get("/scores", (req, res) => {
  db.all(sql_select_scores, (err,data) => {
    if (err) console.error(err.message);
    res.json(data);
  });
});

app.post("/scores", (req,res) => {
  console.log(req.body);
  const {player, score} = req.body;
  const sql_insert_score = `INSERT INTO Score (player, score)
    VALUES ('${player}', ${score});`;
  db.run(sql_insert_score, err => {
    if (err) console.error(err.message);
  });
  res.json({player, score});
});

// Listen on port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
