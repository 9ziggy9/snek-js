import {ROWS, COLS, RIGHT, LEFT, DOWN, UP} from "./global.js";

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
