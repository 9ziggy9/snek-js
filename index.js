const COLS = 20;
const ROWS  = 15;

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Snek {
  constructor(size=3,x=2,y=0) {
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
  moveRight() {
    this.set(this.head.x + 1 < COLS ? this.head.x + 1 : 0, this.head.y);
    this.head.x = this.head.x + 1 < COLS ? this.head.x + 1 : 0;
  }
  init() {
    this.set(0,0);
    this.set(1,0);
    this.set(2,0);
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
      newCell.addEventListener("click", () => newCell.setAttribute("class", "occupied"));
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

function handleInput() {
  console.log(window.event.keyCode);
  switch(window.event.keyCode) {
    // UP
  case 75: case 87: case 38:
    console.log("UP");
    break;
    // DOWN
  case 74: case 83: case 40:
    console.log("DOWN");
    break;
    // LEFT
  case 72: case 65: case 37:
    console.log("LEFT");
    break;
    // RIGHT
  case 76: case 68: case 39:
    console.log("RIGHT");
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
  document.addEventListener("keydown", handleInput);
  const snek = new Snek();
  snek.init();
  snek.render();
  // GAME LOOP
  setInterval(() => {
    clearGrid();
    snek.moveRight();
    snek.render();
  }, 20);
}

window.onload = run;
