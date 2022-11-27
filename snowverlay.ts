function randBetween(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}

class SnowFlake {
  angle = randBetween(0,.02);
  speed = randBetween(0.45, 0.5);
  baseSize = 2;
  sizeRandomiser = [0.2, 1] as const;
  size: number;
  x: number;
  y: number;

  constructor(private canvas: HTMLCanvasElement) {
    if (this.speed > 1) {
      this.speed -= 0.5;
    }
    this.spawn();
  }

  spawn() {
    const sizeModifier = randBetween(...this.sizeRandomiser);
    this.size = this.baseSize * sizeModifier;
    this.x = randBetween(-this.canvas.width * .5, this.canvas.width * 1.5);
    this.y = randBetween(0, this.canvas.height * 2);
    this.draw();
  }

  fall() {
    this.angle += 0.005;

    this.y += this.speed;
    this.x += Math.sin(this.angle) * this.speed;


    /*if (this.x > this.canvas.width || this.x < 0) {
      this.respawn();
      return;
    }*/
    if (this.y > this.canvas.height) {
      this.respawn();
      return;
    }
    this.draw();
  }

  draw() {
    const x = this.x + (this.size / 2);
    const y = this.y + (this.size / 2);
    const context = this.canvas.getContext('2d');
    context.beginPath();
    context.arc(x, y, this.size, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
  }

  respawn() {
    this.x = randBetween(-this.canvas.width * .5, this.canvas.width * 1.5);
    this.y = randBetween(0, this.canvas.height) - this.canvas.height;
    this.draw();
  }
}

class Snowverlay {
  container: HTMLElement;
  flakeCount = 750;
  canvas: HTMLCanvasElement;
  flakes: SnowFlake[] = [];

  constructor(container) {
    this.container = container;
    this.setupCanvas();
    this.spawnSnowflakes();

    setInterval(() => {
      const context = this.canvas.getContext('2d');
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (const flake of this.flakes) {
        flake.fall();
      }
    }, 1);
  }

  setupCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.container.appendChild(this.canvas);
  }

  spawnSnowflakes() {
    for (let i = 0; i < this.flakeCount; i++) {
      this.flakes.push(new SnowFlake(this.canvas));
    }
  }
}

const container = document.querySelector('#snowverlay');
const snowverlay = new Snowverlay(container);