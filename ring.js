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
  }
  set(x,y) {
    this.buffer[this.oldest++] = new Node(x,y);
    this.oldest %= this.size;
    return this.oldest;
  }
}

const snek = new Snek(3);
snek.set(0,0);
snek.set(1,0);
snek.set(2,0);
snek.set(3,0);
console.log(snek.buffer);
