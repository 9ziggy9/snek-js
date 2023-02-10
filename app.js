const express = require("express");
const path = require("path");
require("dotenv").config();
const {Score, Player} = require("./db/models");

// INITIAILIZE EXPRESS
const app = express();

// MIDDLEWARE
app.use(express.json());

// Serve static assets
app.use(express.static(path.join(__dirname, "client")));

// Get all scores
app.get("/scores/:id", async (req,res) => {
  const {id} = req.params;
  const scores = await Player.findByPk(id, {
    include: [{
      model: Score
    }],
    attribute: ["name"],
  });
  res.json(scores);
});

app.get("/scores", async (req,res) => {
  const scores = await Score.findAll({
    include: [{
      model: Player
    }],
    attribute: ["name"],
    order: [
      ["score", "DESC"],
    ],
    limit: 8,
  });
  res.json(
    scores.map(({playerId, score, Player}) =>
      ({playerId, score, playerName: Player.name}))
  );
});

app.post("/scores", async (req,res,next) => {
  const {playerName, score} = req.body;
  const playerExists = await Player.findOne({where: {name: playerName}});
  let newScore = null;
  if (!playerExists) {
    let newPlayer = null;
    try {
      newPlayer = await Player.create({name: playerName});
      newScore = await Score.create({playerId: newPlayer.id, score});
    } catch(err) {
      return next(err);
    }
    return res.json({playerId: newPlayer.id, playerName, score});
  }
  try {
    newScore = await Score.create({playerId: playerExists.id, score});
  } catch(err) {
    return next(err);
  }
  return res.json({playerId: playerExists.id, playerName, score});
});

app.use((err,req,res,next) => {
  console.error(err);
  res.json({error: err.message});
});

const {PORT} = process.env;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


