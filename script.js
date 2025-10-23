const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
resizeCanvas();

window.addEventListener('resize', resizeCanvas);
document.addEventListener('click', (e) => spawnSpiral(e.clientX, e.clientY));

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor(x, y, angle, radius, speed) {
    this.originX = x;
    this.originY = y;
    this.angle = angle;
    this.radius = radius;
    this.speed = speed;
    this.life = 0;
    this.trail = [];
  }

  update() {
    this.radius += this.speed;
    this.angle += 0.1;
    const x = this.originX + this.radius * Math.cos(this.angle);
    const y = this.originY + this.radius * Math.sin(this.angle);
    this.trail.push({ x, y });
    if (this.trail.length > 20) this.trail.shift();
    this.life += 1;
  }

  draw() {
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.beginPath();
      ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.angle * 20}, 100%, 70%, ${i / this.trail.length})`;
      ctx.fill();
    }
  }
}

let particles = [];

function spawnSpiral(x, y) {
  for (let i = 0; i < 100; i++) {
    const angle = i * 0.1;
    const radius = 0;
    const speed = 0.5 + Math.random();
    particles.push(new Particle(x, y, angle, radius, speed));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(11, 12, 16, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.update();
    p.draw();
    if (p.life > 300) particles.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

animate();
