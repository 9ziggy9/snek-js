import {ROWS, COLS} from "./global.js";

export function initGrid() {
  console.log("Initializing grid...");
  let grid = document.getElementById("game-grid");
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let newCell = document.createElement("div");
      newCell.setAttribute("class", "unoccupied");
      newCell.setAttribute("id", `${col},${row}`);
      grid.appendChild(newCell);
    }
  }
}

export function initButtons(game) {
  let generateButton = document.getElementById("debug-apple");
  generateButton.addEventListener("click", () => game.generateApple());
  game.generateApple();
}
