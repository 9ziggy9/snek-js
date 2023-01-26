import {ROWS, COLS, RIGHT, LEFT, DOWN, UP} from "./global.js";
import {Snek} from "./class.js";
import {initButtons, initGrid} from "./init.js";

function handleInput(snek) {
  console.log(window.event.keyCode);
  switch(window.event.keyCode) {
    // UP
  case 75: case 87: case 38:
    snek.dir = UP;
    break;
    // DOWN
  case 74: case 83: case 40:
    snek.dir = DOWN;
    break;
    // LEFT
  case 72: case 65: case 37:
    snek.dir = LEFT;
    break;
    // RIGHT
  case 76: case 68: case 39:
    snek.dir = RIGHT;
    break;
  default:
    console.log("NOT A DIRECTION!!!!");
    break;
  }
}

// TIME COMPLEXITY: O(N^2)
function clearGrid() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const clearMe = document.getElementById(`${col},${row}`);
      clearMe.setAttribute("class", "unoccupied");
    }
  }
}

function run() {
  let frameCount = 0;
  initGrid();
  initButtons();
  const snek = new Snek();
  // EVENT LISTENER MUST TAKE CALLBACK/FUNCTION REFERENCE
  document.addEventListener("keydown", () => handleInput(snek));
  snek.init();
  snek.render();
  // GAME LOOP
  setInterval(() => {
    clearGrid();
    snek.move();
    snek.render();
  }, 75);
}

window.onload = run;
