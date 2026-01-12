document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeCounterAnimations();
    initializeSkillBarAnimations();
    initializeCardTiltEffect();
});
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .zoom-in'
    );

    animatedElements.forEach(el => observer.observe(el));
}
function initializeCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasDecimal = text.includes('.');
    const hasPlus = text.includes('+');
    let target = parseFloat(text.replace(/[^0-9.]/g, ''));

    if (isNaN(target)) return;

    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        let displayValue;
        if (hasDecimal) {
            displayValue = current.toFixed(2);
        } else {
            displayValue = Math.floor(current);
        }

        element.textContent = hasPlus ? displayValue + '+' : displayValue;
    }, 16);
}
function initializeSkillBarAnimations() {
    const skillBars = document.querySelectorAll('.skill-bar');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}
function initializeCardTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .achievement-card, .hobby-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}
function initializeTextReveal() {
    const textElements = document.querySelectorAll('.reveal-text');

    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        const words = text.split(' ');

        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word + ' ';
            wordSpan.style.opacity = '0';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            element.appendChild(wordSpan);
        });
    });
}
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);

            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}
function initializeMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .project-btn, .filter-btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple-effect');

    const ripple = button.getElementsByClassName('ripple-effect')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}
document.querySelectorAll('.btn, .project-btn, .filter-btn, .skill-tab').forEach(button => {
    button.addEventListener('click', createRipple);
});
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .btn, .project-btn, .filter-btn, .skill-tab {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);
function staggerAnimation(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;

                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * delay);
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
}
staggerAnimation('.skills-grid', 100);
staggerAnimation('.projects-grid', 150);
staggerAnimation('.achievements-grid', 100);
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {

        item.style.opacity = '0';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }

        timelineObserver.observe(item);
    });
}

initializeTimelineAnimation();
function createGlitchEffect(element) {
    const text = element.textContent;
    element.setAttribute('data-text', text);

    element.addEventListener('mouseenter', () => {
        element.classList.add('glitch');
    });

    element.addEventListener('mouseleave', () => {
        element.classList.remove('glitch');
    });
}
function initializeFloatingIcons() {
    const icons = document.querySelectorAll('.hobby-icon, .divider-icon, .lotus-icon');

    icons.forEach((icon, index) => {
        const delay = index * 0.5;
        const duration = 3 + (index % 3);

        icon.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

initializeFloatingIcons();
function initializeMouseFollowEffect() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.01;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }
    setInterval(() => {
        if (particles.length < 50) {
            particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    }, 200);

    animate();
}
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <svg class="loader-lotus" width="80" height="80" viewBox="0 0 24 24">
                <path d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z" fill="#FF69B4"/>
                <path d="M12 14C12 14 8 18 8 22H16C16 18 12 14 12 14Z" fill="#FF69B4" opacity="0.6"/>
            </svg>
            <p style="color: #FF69B4; font-family: 'Poppins', sans-serif; margin-top: 20px;">Loading...</p>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #FFF5F7;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    `;

    const loaderContent = loader.querySelector('.loader-content');
    loaderContent.style.textAlign = 'center';

    const loaderLotus = loader.querySelector('.loader-lotus');
    loaderLotus.style.animation = 'pulse 1.5s ease-in-out infinite';

    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

function initializeCustomTyping() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;

    const texts = typingElement.getAttribute('data-texts').split(',');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}
function initializeLazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');

                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });

                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
}

initializeLazyLoadImages();
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    let fps = 0;
    let lastTime = performance.now();
    let frames = 0;

    function calculateFPS() {
        const currentTime = performance.now();
        frames++;

        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (currentTime - lastTime));
            frames = 0;
            lastTime = currentTime;
            console.log(`FPS: ${fps}`);
        }

        requestAnimationFrame(calculateFPS);
    }

}
