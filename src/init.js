import {ROWS, COLS} from "./global.js";

function generateApple() {
  const col = Math.floor(Math.random() * COLS);
  const row = Math.floor(Math.random() * ROWS);
  let apple = document.getElementById(`${col},${row}`);
  apple.setAttribute("class", "apple");
}

export function initGrid() {
  console.log("Initializing grid...");
  let grid = document.getElementById("game-grid");
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let newCell = document.createElement("div");
      newCell.setAttribute("class", "unoccupied");
      newCell.setAttribute("id", `${col},${row}`);
      newCell.addEventListener("click", () => newCell.setAttribute("class", "occupied"));
      grid.appendChild(newCell);
    }
  }
}

export function initButtons() {
  let generateButton = document.getElementById("debug-apple");
  generateButton.addEventListener("click", generateApple);
}
