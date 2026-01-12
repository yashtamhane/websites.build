class LotusParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 25;
        this.mouse = { x: null, y: null, radius: 150 };

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new LotusPetal(this.canvas, this.mouse));
        }
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        if (window.innerWidth < 768) {
            this.particleCount = 10;
            this.createParticles();
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        requestAnimationFrame(() => this.animate());
    }
}

class LotusPetal {
    constructor(canvas, mouse) {
        this.canvas = canvas;
        this.mouse = mouse;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 10;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.colors = [
            'rgba(255, 182, 193, ',
            'rgba(255, 192, 203, ',
            'rgba(255, 105, 180, ',
            'rgba(220, 174, 150, ',
        ];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.floatOffset = Math.random() * Math.PI * 2;
        this.floatSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {

        this.floatOffset += this.floatSpeed;
        const floatX = Math.sin(this.floatOffset) * 0.5;
        const floatY = Math.cos(this.floatOffset * 0.5) * 0.3;
        this.x += this.speedX + floatX;
        this.y += this.speedY + floatY;
        this.rotation += this.rotationSpeed;
        if (this.mouse.x !== null && this.mouse.y !== null) {
            const dx = this.mouse.x - this.x;
            const dy = this.mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);

                this.x -= Math.cos(angle) * force * 2;
                this.y -= Math.sin(angle) * force * 2;
            }
        }
        if (this.x > this.canvas.width + this.size) {
            this.x = -this.size;
        } else if (this.x < -this.size) {
            this.x = this.canvas.width + this.size;
        }

        if (this.y > this.canvas.height + this.size) {
            this.y = -this.size;
            this.x = Math.random() * this.canvas.width;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        this.drawLotusPetal(ctx);

        ctx.restore();
    }

    drawLotusPetal(ctx) {

        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.strokeStyle = this.color + (this.opacity * 0.5) + ')';
        ctx.lineWidth = 1;

        ctx.beginPath();
        const size = this.size;
        ctx.moveTo(0, -size);
        ctx.bezierCurveTo(
            size * 0.3, -size * 0.7,
            size * 0.5, -size * 0.3,
            size * 0.3, 0
        );
        ctx.bezierCurveTo(
            size * 0.2, size * 0.3,
            0, size * 0.5,
            0, size * 0.3
        );
        ctx.bezierCurveTo(
            0, size * 0.5,
            -size * 0.2, size * 0.3,
            -size * 0.3, 0
        );
        ctx.bezierCurveTo(
            -size * 0.5, -size * 0.3,
            -size * 0.3, -size * 0.7,
            0, -size
        );

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        gradient.addColorStop(0, this.color + (this.opacity * 1.5) + ')');
        gradient.addColorStop(1, this.color + (this.opacity * 0.3) + ')');

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.fillStyle = this.color + (this.opacity * 2) + ')';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
    }
}
class SimpleParticle {
    constructor(canvas, mouse) {
        this.canvas = canvas;
        this.mouse = mouse;

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 8 + 3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.opacity = Math.random() * 0.4 + 0.1;

        const pinkShades = [
            'rgba(255, 182, 193, ',
            'rgba(255, 192, 203, ',
            'rgba(255, 105, 180, ',
        ];
        this.color = pinkShades[Math.floor(Math.random() * pinkShades.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.mouse.x !== null && this.mouse.y !== null) {
            const dx = this.mouse.x - this.x;
            const dy = this.mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 1.5;
                this.y -= Math.sin(angle) * force * 1.5;
            }
        }
        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) {
            this.y = 0;
            this.x = Math.random() * this.canvas.width;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color + (this.opacity * 0.5) + ')';
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}
document.addEventListener('DOMContentLoaded', function() {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {

        if (window.innerWidth < 768) {
            initializeSimpleParticles();
        } else {

            new LotusParticleSystem('petals-canvas');
        }
    }
});
function initializeSimpleParticles() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 15;
    const mouse = { x: null, y: null, radius: 100 };

    for (let i = 0; i < particleCount; i++) {
        particles.push(new SimpleParticle(canvas, mouse));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
}
class FallingPetalsSystem {
    constructor(canvasId, count = 20) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.petals = [];
        this.count = count;

        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        for (let i = 0; i < this.count; i++) {
            this.petals.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                size: Math.random() * 10 + 5,
                speedY: Math.random() * 1 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.3 + 0.2,
                swing: Math.random() * Math.PI * 2,
                swingSpeed: Math.random() * 0.03 + 0.01
            });
        }

        this.animate();

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.petals.forEach(petal => {
            petal.swing += petal.swingSpeed;
            petal.x += Math.sin(petal.swing) * 0.5 + petal.speedX;
            petal.y += petal.speedY;

            if (petal.y > this.canvas.height) {
                petal.y = -20;
                petal.x = Math.random() * this.canvas.width;
            }
            this.ctx.fillStyle = `rgba(255, 182, 193, ${petal.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(petal.x, petal.y, petal.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}
