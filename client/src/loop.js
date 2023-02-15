import {gameOver} from "./listeners.js";
let then = Date.now();

export function startGame(fps, snek, game) {
  let fpsInterval = 1000 / fps;
  loop(fpsInterval, snek, game);
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
