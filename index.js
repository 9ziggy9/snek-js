import {HELLO} from "./test.js";

const COLS = 20;
const ROWS  = 15;

const RIGHT = [1,0];
const LEFT = [-1,0];
const DOWN = [0,1];
const UP = [0,-1];

console.log(HELLO);

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Snek {
  constructor(size=7) {
    this.size = size;
    this.buffer = new Array(this.size);
    this.head = {x: size - 1, y: 0};
    this.oldest = 0;
    // TODO: Implement string based movement
    this.dir = RIGHT;
  }
  set(x,y) {
    this.buffer[this.oldest++] = new Node(x,y);
    this.oldest %= this.size;
    return this.oldest;
  }
  move() {
    const [x,y] = this.dir;
    this.head.x = (this.head.x + x > 0 ? this.head.x + x
		                       : COLS + this.head.x + x) % COLS;
    this.head.y = (this.head.y + y > 0 ? this.head.y + y
		                       : ROWS + this.head.y + y) % ROWS;
    this.set(this.head.x, this.head.y);
  }
  init() {
    this.set(0,0);
    this.set(1,0);
    this.set(2,0);
    this.set(3,0);
    this.set(4,0);
    this.set(5,0);
    this.set(6,0);
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
}

function generateApple() {
  const col = Math.floor(Math.random() * COLS);
  const row = Math.floor(Math.random() * ROWS);
  let apple = document.getElementById(`${col},${row}`);
  apple.setAttribute("class", "apple");
}

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

function initButtons() {
  let generateButton = document.getElementById("debug-apple");
  generateButton.addEventListener("click", generateApple);
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
