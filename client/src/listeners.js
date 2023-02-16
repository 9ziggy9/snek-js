import {getScores, postScore, getScoresByPage} from "./dispatch.js";

const highlightScore = (scoreId) => {
  let newPlayer = document.getElementById(`name-${scoreId}`);
  let newScore = document.getElementById(`score-${scoreId}`);
  if (!newPlayer || !newScore) return null; // TODO: handle more gracefully
  newPlayer.scrollIntoView({behavior: "smooth", block: "center"});
  newScore.classList.add("new-highlight");
  newPlayer.classList.add("new-highlight");
  return scoreId;
};

export function gameOver(game) {
  const score = document.querySelector(".score-form");
  const blur = document.querySelector(".blur-win");
  const input = document.getElementById("score-input");
  const points = document.querySelector(".score-area");
  blur.classList.add("score-reveal");
  score.classList.add("score-reveal");
  points.classList.add("score-zoom");
  input.focus();
  getScores();

  let PAGE = 1;
  const scoreScroll = document.querySelector(".player-score-pane");
  scoreScroll.addEventListener("scroll", async () => {
    const {scrollTop, scrollHeight, clientHeight} = scoreScroll;
    const yRelBottom = Math.abs(scrollHeight - scrollTop - clientHeight);
    console.log(yRelBottom);
    if (yRelBottom <= 25) {
      PAGE++;
      await getScoresByPage(PAGE, 50);
    }
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
