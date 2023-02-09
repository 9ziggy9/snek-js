let then = Date.now();

export function startGame(fps, snek, game) {
  let fpsInterval = 1000 / fps;
  loop(fpsInterval, snek, game);
}

const getScores = async () => {
  const response = await fetch("http://localhost:1337/scores");
  const scores = await response.json();
  const nameContainer = document.getElementById("high-score-left");
  const scoreContainer = document.getElementById("high-score-right");
  scores.forEach(score => {
    // <div class="left-score-entry">2500</div>
    const nameEntry = document.createElement("div");
    nameEntry.innerText = score.player;
    const scoreEntry = document.createElement("div");
    scoreEntry.innerText = score.score;
    nameEntry.setAttribute("class", "left-score-entry");
    scoreEntry.setAttribute("class", "left-score-entry");
    nameContainer.appendChild(nameEntry);
    scoreContainer.appendChild(scoreEntry);
  });
};

const postScore = async (player, score) => {
  const response = await fetch("http://localhost:1337/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({player, score})
  });
  const playAgain = document.querySelector(".play-again");
  const playAgainButton = document.getElementById("play-again-submit");
  const disableInput = document.getElementById("score-input");
  // TODO: Add event listening, potentially change to form submit
  playAgain.classList.add("play-again-reveal");
  playAgainButton.focus();
  disableInput.disabled = true;
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

  const form = document.getElementById("high-score-input-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    game.audioBlip("audio-submit");
    postScore(e.target[0].value, game.score);
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
