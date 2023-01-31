import {ROWS, COLS, RIGHT, LEFT, DOWN, UP} from "./global.js";
import {COLORS_SOLARIZED, randColor} from "./color.js";

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Game {
  constructor() {
    this.apple = null;
    this.over = false;
    this.bonusApple = false;
    this.score = 0;
  }
  generateApple() {
    const col = Math.floor(Math.random() * COLS);
    const row = Math.floor(Math.random() * ROWS);
    let apple = document.getElementById(`${col},${row}`);
    if (Math.random() > 0.20) {
      this.bonusApple = false;
      apple.setAttribute("class", "regular-apple");
    } else {
      this.bonusApple = true;
      apple.setAttribute("class", "bonus-apple");
    }
    this.apple = {x: col, y: row};
  }
  renderScore() {
    const score = document.getElementById("score");
    score.innerText = this.score;
  }
}

export class Snek {
  constructor(size=3) {
    this.size = size;
    this.buffer = new Array(this.size);
    this.head = {x: size - 1, y: 0};
    this.oldest = 0;
    this.dir = RIGHT;
    this.bonus = false;
    this.dead = null;
  }
  set(x,y) {
    this.dead = this.buffer[this.oldest];
    this.buffer[this.oldest++] = new Node(x,y);
    this.oldest %= this.size;
    return this.oldest;
  }
  move(game) {
    const [x,y] = this.dir;
    this.head.x = (this.head.x + x > 0 ? this.head.x + x
		                       : COLS + this.head.x + x) % COLS;
    this.head.y = (this.head.y + y > 0 ? this.head.y + y
		                       : ROWS + this.head.y + y) % ROWS;
    if (this.isColliding()) game.over = true;
    if (this.foundApple(game)) {
      const bonusSplash = document.querySelector(".bonus-text");
      this.grow();
      this.bonus = game.bonusApple;
      this.bonus
	? bonusSplash.classList.add("show-bonus")
	: bonusSplash.classList.remove("show-bonus");
      game.score += 15;
      game.renderScore();
      game.generateApple();
    }
    return this.set(this.head.x, this.head.y);
  }
  foundApple = ({apple: {x,y}}) => this.head.x === x && this.head.y === y;
  isColliding = () => !this.bonus
    && Boolean(this.buffer.find(n => n.x === this.head.x && n.y === this.head.y));
  grow = () => {
    const {x,y} = this.buffer[this.oldest];
    this.buffer = [
      ...this.buffer.slice(0,this.oldest),
      new Node(x,y),
      ...this.buffer.slice(this.oldest)
    ];
    this.size++;
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
      cell.style.backgroundColor = this.bonus
	? randColor(COLORS_SOLARIZED)
	: COLORS_SOLARIZED["my-violet"];
    });
  }
  clear() {
    if (this.dead) {
      const {x,y} = this.dead;
      const deadCell = document.getElementById(`${x},${y}`);
      deadCell.setAttribute("class", "unoccupied");
      deadCell.style.backgroundColor = COLORS_SOLARIZED["my-black"];
    }
  }
}
