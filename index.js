const COLS = 20;
const ROWS  = 15;

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Snek {
  constructor(size=5,x=2,y=0) {
    this.size = size;
    this.buffer = new Array(this.size);
    this.head = {x, y};
    this.oldest = 0;
    // TODO: Implement string based movement
    this.dir = "RIGHT";
  }
  set(x,y) {
    this.buffer[this.oldest++] = new Node(x,y);
    this.oldest %= this.size;
    return this.oldest;
  }
  move() {
    switch (this.dir) {
    case "RIGHT":
      this.head.x = this.head.x + 1 < COLS ? this.head.x + 1 : 0;
      this.set(this.head.x, this.head.y);
      break;
    case "DOWN":
      console.log(this.buffer);
      this.head.y = this.head.y + 1 < ROWS ? this.head.y + 1 : 0;
      this.set(this.head.x, this.head.y);
      break;
    case "UP":
      this.head.y = this.head.y > 0 ? this.head.y - 1 : ROWS - 1;
      this.set(this.head.x, this.head.y);
      break;
    case "LEFT":
      this.head.x = this.head.x > 0 ? this.head.x - 1 : COLS - 1;
      this.set(this.head.x, this.head.y);
      break;
    default:
      console.error("WTF");
      break;
    }
  }
  init() {
    this.set(0,0);
    this.set(1,0);
    this.set(2,0);
    this.set(3,0);
    this.set(4,0);
  }
  render() {
    this.buffer.forEach(node => {
      const cell = document.getElementById(`${node.x},${node.y}`);
      cell.setAttribute("class", "occupied");
    });
  }
}

function initGrid() {
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

function handleInput(snek) {
  switch(window.event.keyCode) {
    // UP
  case 75: case 87: case 38:
    snek.dir = "UP";
    break;
    // DOWN
  case 74: case 83: case 40:
    snek.dir = "DOWN";
    break;
    // LEFT
  case 72: case 65: case 37:
    snek.dir = "LEFT";
    break;
    // RIGHT
  case 76: case 68: case 39:
    snek.dir = "RIGHT";
    break;
  default:
    console.log("NOT A DIRECTION!!!!");
    break;
  }
}

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
  const snek = new Snek();
  snek.init();
  document.addEventListener("keydown", () => handleInput(snek));
  snek.render();
  // GAME LOOP
  setInterval(() => {
    clearGrid();
    snek.move();
    snek.render();
  }, 75);
}

window.onload = run;
