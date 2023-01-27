import {ROWS, COLS, RIGHT, LEFT, DOWN, UP} from "./global.js";
import {COLORS_SOLARIZED, randColor} from "./color.js";
import {generateApple} from "./init.js";

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Snek {
  constructor(size=7) {
    this.size = size;
    this.buffer = new Array(this.size);
    this.head = {x: size - 1, y: 0};
    this.oldest = 0;
    // TODO: Implement string based movement
    this.dir = RIGHT;
    this.bonus = false;
    this.dead = null;
    this.isAlive = true;
    this.apple = null;
  }
  set(x,y) {
    this.dead = this.buffer[this.oldest];
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
    if (this.isColliding(this.head.x, this.head.y)) this.isAlive = false;
    if (this.foundApple(this.head.x, this.head.y)) {
      this.grow();
      generateApple(this);
    }
    return this.set(this.head.x, this.head.y);
  }
  foundApple = (x,y) => x === this.apple[0] && y === this.apple[1];
  isColliding = (x,y) => Boolean(this.buffer.find(n => n.x === x && n.y === y));
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
    this.set(3,0);
    this.set(4,0);
    this.set(5,0);
    this.set(6,0);
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