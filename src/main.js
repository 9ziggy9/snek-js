import {ROWS, COLS, RIGHT, LEFT, DOWN, UP} from "./global.js";
import {Snek} from "./class.js";
import {initButtons, initGrid} from "./init.js";
import {COLORS_SOLARIZED} from "./color.js";
import {startGame} from "./loop.js";

function handleInput(snek) {
  switch(window.event.keyCode) {
  case 75: case 87: case 38:
    if (snek.dir[0] === 0 && snek.dir[1] === 1) break;
    snek.dir = UP;
    break;
  case 74: case 83: case 40:
    if (snek.dir[0] === 0 && snek.dir[1] === -1) break;
    snek.dir = DOWN;
    break;
  case 72: case 65: case 37:
    if (snek.dir[0] === 1 && snek.dir[1] === 0) break;
    snek.dir = LEFT;
    break;
  case 76: case 68: case 39:
    if (snek.dir[0] === -1 && snek.dir[1] === 0) break;
    snek.dir = RIGHT;
    break;
  default:
    break;
  }
}

function run() {
  let frameCount = 0;
  const snek = new Snek();
  initGrid();
  initButtons(snek);
  // EVENT LISTENER MUST TAKE CALLBACK/FUNCTION REFERENCE
  document.addEventListener("keydown", () => handleInput(snek));
  snek.init();
  snek.render();
  // TODO: decouple me
  let bonusButton = document.getElementById("debug-bonus");
  bonusButton.addEventListener("click", () => snek.bonus = !snek.bonus);
  let growButton = document.getElementById("debug-grow");
  growButton.addEventListener("click", snek.grow);
  // GAME LOOP: setInterval is a BAAAAD idea.
  // requestAnimationFrame
  startGame(15, snek);
}

window.onload = run;
