let then = Date.now();

export function startGame(fps, snek) {
  let fpsInterval = 1000 / fps;
  loop(fpsInterval, snek);
}

// WAAAAAY BETTER than trying to use setInterval
function loop(fpsInterval, snek) {
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed > (snek.bonus ? fpsInterval / 1.75 : fpsInterval)) {
    then = now - (elapsed % fpsInterval);
    if (snek.isAlive) {
      snek.move();
      snek.render();
      snek.clear();
    } else { // GAME OVER EVENTS
      alert("GAME OVER!");
    }
  }
  // WE NEED requestAnimationFrame because it will only execute code
  // when a re-render is actually necessary. Simple recursion will
  // blow up the callstack!
  return requestAnimationFrame(() => loop(snek, fpsInterval));
}
