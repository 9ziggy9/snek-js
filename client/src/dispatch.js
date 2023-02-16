// STATIC VARIABLES
let RANK;
let HIGHSCORE;

const checker = (i) => i % 2 ? "checker" : "no-checker";

const purgeScores = () => {
  let rankContainer = document.getElementById("high-score-number");
  let nameContainer = document.getElementById("high-score-player");
  let scoreContainer = document.getElementById("high-score-score");
  rankContainer.innerHTML = "";
  nameContainer.innerHTML = "";
  scoreContainer.innerHTML = "";
};

const rankScore = (rank, hs, score) => (score < hs && hs !== -1)
      ? {rank: rank+1, hs: score}
      : {rank, hs: score};

export const getScoresByPage = async (page, size) => {
  const response = await fetch(
    `http://localhost:1337/scores?page=${page}&size=${size}`
  );
  const scores = await response.json();
  const nameContainer = document.getElementById("high-score-player");
  const scoreContainer = document.getElementById("high-score-score");
  const rankContainer = document.getElementById("high-score-number");
  scores.forEach((score,i) => {
    const nameEntry = document.createElement("div");
    nameEntry.innerText = score.playerName;
    const scoreEntry = document.createElement("div");
    scoreEntry.innerText = score.score;
    const rankEntry = document.createElement("div");

    // Cool trick, remember
    ({rank: RANK, hs: HIGHSCORE} = rankScore(RANK, HIGHSCORE, score.score));
    rankEntry.innerText = RANK;

    nameEntry.setAttribute("class", `left-score-entry ${checker(i)}`);
    scoreEntry.setAttribute("class", `left-score-entry ${checker(i)}`);
    rankEntry.setAttribute("class", `left-score-entry ${checker(i)}`);
    nameEntry.setAttribute("id", `name-${score.id}`);
    scoreEntry.setAttribute("id", `score-${score.id}`);
    rankEntry.setAttribute("id", `rank-${score.id}`);
    nameContainer.appendChild(nameEntry);
    scoreContainer.appendChild(scoreEntry);
    rankContainer.appendChild(rankEntry);
  });
};

export const getScores = async () => {
  RANK = 1;
  HIGHSCORE = -1;
  await getScoresByPage(1,50);
};

export const postScore = async (player, score) => {
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
