import {ROWS, COLS, RIGHT, LEFT, DOWN, UP, AUDIO_SOURCES} from "./global.js";
import {Snek, Game} from "./class.js";
import {initGrid} from "./init.js";
import {COLORS_SOLARIZED} from "./color.js";
import {startGame} from "./loop.js";

// TODO: IMPLEMENT VOLUME SLIDER
function setVolume() {
  AUDIO_SOURCES.forEach(src => {
    document.getElementById(src).volume = 0.1;
  });
}

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
  initGrid();
  setVolume(); // TODO: IMPLEMENT VOLUME SLIDER
  const snek = new Snek();
  const game = new Game();
  game.generateApple();
  document.addEventListener("keydown", () => handleInput(snek));
  snek.init();
  snek.render();
  startGame(15, snek, game);
}

window.onload = run;
