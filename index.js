const COLS = 15;
const ROWS  = 10;

function init() {
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
  let generateButton = document.getElementById("debug-apple");
  generateButton.addEventListener("click", generateApple);
}

function generateApple() {
  const col = Math.floor(Math.random() * COLS);
  const row = Math.floor(Math.random() * ROWS);
  let apple = document.getElementById(`${col},${row}`);
  apple.setAttribute("class", "apple");
}

// START: MESSIN' AROUND
const randColor = () => "#" + [...Array(6)]
      .map(n => Math.floor(Math.random() * 16).toString(16))
      .join("");

function crazyColor() {
  let grid = document.getElementById("game-grid");
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let myCell = document.getElementById(`${col},${row}`);
      myCell.style.backgroundColor = randColor();
    }
  }
}
// END: MESSIN' AROUND

window.onload = () => {
  init();
};
