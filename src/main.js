import {ROWS, COLS, RIGHT, LEFT, DOWN, UP} from "./global.js";
import {Snek} from "./class.js";
import {initButtons, initGrid} from "./init.js";
import {COLORS_SOLARIZED} from "./color.js";
import {initLoop} from "./loop.js";

// Custom sleep function used to make variance in time tenable.
// Possible solution could be to use requestAnimationFrame

function handleInput(snek) {
  switch(window.event.keyCode) {
  case 75: case 87: case 38:
    snek.dir = UP;
    break;
  case 74: case 83: case 40:
    snek.dir = DOWN;
    break;
  case 72: case 65: case 37:
    snek.dir = LEFT;
    break;
  case 76: case 68: case 39:
    snek.dir = RIGHT;
    break;
  default:
    break;
  }
}

// TODO: MAKE ME MORE EFFICIENT
// TIME COMPLEXITY: O(N^2)
function clearGrid() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const clearMe = document.getElementById(`${col},${row}`);
      clearMe.setAttribute("class", "unoccupied");
      clearMe.style.backgroundColor = COLORS_SOLARIZED["my-black"];
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

  // TODO: decouple me
  let bonusButton = document.getElementById("debug-bonus");
  bonusButton.addEventListener("click", () => snek.bonus = !snek.bonus);

  // GAME LOOP
  initLoop(15, snek);
  // const loop = setInterval(() => {
  //   clearGrid();
  //   snek.move();
  //   BONUS ? snek.renderBonus() : snek.render();
  // }, 75);
}

window.onload = run;
