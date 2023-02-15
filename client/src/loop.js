let then = Date.now();

export function startGame(fps, snek, game) {
  let fpsInterval = 1000 / fps;
  loop(fpsInterval, snek, game);
}

const checker = (i) => i % 2 ? "checker" : "no-checker";

const getScores = async () => {
  const response = await fetch("http://localhost:1337/scores");
  const scores = await response.json();
  const nameContainer = document.getElementById("high-score-player");
  const scoreContainer = document.getElementById("high-score-score");
  const rankContainer = document.getElementById("high-score-number");
  scores.forEach((score,rank) => {
    const nameEntry = document.createElement("div");
    nameEntry.innerText = score.playerName;
    const scoreEntry = document.createElement("div");
    scoreEntry.innerText = score.score;
    const rankEntry = document.createElement("div");
    rankEntry.innerText = rank + 1;
    nameEntry.setAttribute("class", `left-score-entry ${checker(rank)}`);
    scoreEntry.setAttribute("class", `left-score-entry ${checker(rank)}`);
    rankEntry.setAttribute("class", `left-score-entry ${checker(rank)}`);
    nameEntry.setAttribute("id", `name-${score.id}`);
    scoreEntry.setAttribute("id", `score-${score.id}`);
    rankEntry.setAttribute("id", `rank-${rank}`);
    nameContainer.appendChild(nameEntry);
    scoreContainer.appendChild(scoreEntry);
    rankContainer.appendChild(rankEntry);
  });
};

const purgeScores = () => {
  let rankContainer = document.getElementById("high-score-number");
  let nameContainer = document.getElementById("high-score-player");
  let scoreContainer = document.getElementById("high-score-score");
  rankContainer.innerHTML = "";
  nameContainer.innerHTML = "";
  scoreContainer.innerHTML = "";
};

const highlightScore = (scoreId) => {
  if (!scoreId) return null;
  let newPlayer = document.getElementById(`name-${scoreId}`);
  let newScore = document.getElementById(`score-${scoreId}`);
  newPlayer.scrollIntoView({behavior: "smooth", block: "center"});
  newScore.classList.add("new-highlight");
  newPlayer.classList.add("new-highlight");
  return scoreId;
};

const postScore = async (player, score) => {
  const response = await fetch("http://localhost:1337/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({playerName: player.toUpperCase(), score})
  });
  const {scoreId} = await response.json();
  console.log("SCORE ID HERE", scoreId);
  await purgeScores();
  await getScores();
  const playAgain = document.querySelector(".play-again");
  const playAgainButton = document.getElementById("play-again-submit");
  const disableInput = document.getElementById("score-input");
  // TODO: Add event listening, potentially change to form submit
  playAgain.classList.add("play-again-reveal");
  playAgainButton.focus();
  disableInput.disabled = true;
  return scoreId;
};

function gameOver(game) {
  const score = document.querySelector(".score-form");
  const blur = document.querySelector(".blur-win");
  const input = document.getElementById("score-input");
  const points = document.querySelector(".score-area");
  blur.classList.add("score-reveal");
  score.classList.add("score-reveal");
  points.classList.add("score-zoom");
  input.focus();
  getScores();

  const scoreScroll = document.querySelector(".player-score-pane");
  scoreScroll.addEventListener("scroll", () => {
    const {scrollTop, scrollHeight, clientHeight} = scoreScroll;
    if (scrollTop >= scrollHeight / 2) console.log("Found center");
  });

  const form = document.getElementById("high-score-input-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    game.audioBlip("audio-submit");
    const returnId = await postScore(e.target[0].value, game.score);
    highlightScore(returnId);
  });

  return 0;
}

// WAAAAAY BETTER than trying to use setInterval
function loop(fpsInterval, snek, game) {
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed > (snek.bonus ? fpsInterval / 1.75 : fpsInterval)) {
    then = now - (elapsed % fpsInterval);
    if (!game.over) {
      snek.move(game);
      snek.render();
      snek.clear();
    } else { // GAME OVER EVENTS
      return gameOver(game);
    }
  }
  // WE NEED requestAnimationFrame because it will only execute code
  // when a re-render is actually necessary. Simple recursion will
  // blow up the callstack!
  return requestAnimationFrame(() => loop(snek, fpsInterval, game));
}
