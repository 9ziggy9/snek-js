let then = Date.now();

export function startGame(fps, snek) {
  let fpsInterval = 1000 / fps;
  loop(fpsInterval, snek);
}

function loop(fpsInterval, snek) {
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed > (snek.bonus ? fpsInterval / 1.75 : fpsInterval)) {
    then = now - (elapsed % fpsInterval);
    snek.move();
    snek.render();
    snek.clear();
  }
  // WE NEED requestAnimationFrame because it will only execute code
  // when a re-render is actually necessary. Simple recursion will
  // blow up the callstack!
  return requestAnimationFrame(() => loop(snek, fpsInterval));
}
