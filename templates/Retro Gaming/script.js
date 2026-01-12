// === PIXEL PORTFOLIO - DEPTH SCROLL EXPERIENCE ===

// Depth Scroll Manager
class DepthScroll {
    constructor() {
        this.container = document.getElementById('depth-container');
        this.sections = Array.from(document.querySelectorAll('section'));
        this.currentScroll = 0;
        this.targetScroll = 0;
        this.maxScroll = (this.sections.length - 1) * 2000;
        this.depthBar = document.querySelector('.depth-bar');
        this.scrollTimeout = null;
        this.isScrolling = false;
        this.scrollDirection = 0; // Track scroll direction: 1 = forward, -1 = backward

        this.init();
    }

    init() {
        this.setupSections();
        this.addEventListeners();
        this.animate();
    }

    setupSections() {
        // Position sections in 3D space along Z-axis
        this.sections.forEach((section, index) => {
            const zPosition = -index * 2000; // 2000px apart
            section.style.transform = `translateZ(${zPosition}px)`;
            section.dataset.zIndex = zPosition;
        });
    }

    addEventListeners() {
        // Mouse wheel for depth scrolling - reduced sensitivity
        window.addEventListener('wheel', (e) => {
            // Don't prevent default on buttons or interactive elements
            if (e.target.closest('button, a, input, select, textarea')) {
                return;
            }

            e.preventDefault();
            this.isScrolling = true;

            // Track scroll direction
            const previousScroll = this.targetScroll;

            // Reduced multiplier from 2 to 1.5 for smoother control
            this.targetScroll += e.deltaY * 1.5;
            this.targetScroll = Math.max(0, Math.min(this.maxScroll, this.targetScroll));

            // Determine direction: backward = -1, forward = 1
            this.scrollDirection = this.targetScroll < previousScroll ? -1 : 1;

            this.updateDepthIndicator();

            // Snap to nearest section after scrolling stops
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.snapToNearestSection();
                this.isScrolling = false;
                this.scrollDirection = 0;
            }, 150);
        }, { passive: false });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                this.targetScroll += 200;
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                this.targetScroll -= 200;
            }
            this.targetScroll = Math.max(0, Math.min(this.maxScroll, this.targetScroll));
            this.updateDepthIndicator();
        });

        // Touch support for mobile
        let touchStartY = 0;
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            this.isScrolling = true;
        });

        window.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touchY = e.touches[0].clientY;
            const delta = touchStartY - touchY;
            this.targetScroll += delta * 1.5; // Reduced from 2
            this.targetScroll = Math.max(0, Math.min(this.maxScroll, this.targetScroll));
            touchStartY = touchY;
            this.updateDepthIndicator();
        }, { passive: false });

        window.addEventListener('touchend', () => {
            setTimeout(() => {
                this.snapToNearestSection();
                this.isScrolling = false;
            }, 150);
        });
    }

    snapToNearestSection() {
        // Only snap if we're close to a section boundary (within 400px)
        const currentSection = Math.round(this.targetScroll / 2000);
        const nearestSectionPos = currentSection * 2000;
        const distanceToSection = Math.abs(this.targetScroll - nearestSectionPos);

        // Only snap if within 400px of a section, otherwise let user free-scroll
        if (distanceToSection < 400) {
            this.targetScroll = Math.max(0, Math.min(this.maxScroll, nearestSectionPos));
            this.updateDepthIndicator();
        }
    }

    animate() {
        // Much faster easing during active scrolling
        let easingFactor = this.isScrolling ? 0.3 : 0.15;

        // Smooth scroll with easing
        this.currentScroll += (this.targetScroll - this.currentScroll) * easingFactor;

        // Update container transform to move through depth
        this.container.style.transform = `translateZ(${this.currentScroll}px)`;

        // ALWAYS use targetScroll for visibility to prevent lag
        const scrollForVisibility = this.targetScroll;

        // Fade sections based on distance
        this.sections.forEach((section) => {
            const zIndex = parseFloat(section.dataset.zIndex);
            // Position relative to camera
            const relativeZ = zIndex + scrollForVisibility;

            // Calculate distance from camera
            const distance = Math.abs(relativeZ);

            // Simplified visibility logic - keep everything more visible
            let opacity = 1;
            let blur = 0;

            // Sections behind the camera (positive relativeZ)
            if (relativeZ > 800) {
                // Fade out sections behind camera
                opacity = Math.max(0, 1 - (relativeZ - 800) / 2000);
                blur = Math.min((relativeZ - 800) / 400, 5);
            }
            // Sections in front of camera (negative relativeZ)
            else if (relativeZ < 0) {
                // Keep forward sections highly visible
                if (distance > 500) {
                    opacity = Math.max(0.7, 1 - (distance - 500) / 5000);
                    blur = Math.min((distance - 500) / 2000, 1.5);
                }
            }
            // Sections at camera position (0 to 800)
            else {
                opacity = 1;
                blur = 0;
            }

            section.style.opacity = opacity;
            section.style.filter = `blur(${blur}px)`;

            // CRITICAL: Enable pointer-events only on the currently visible section
            // This prevents invisible stacked sections from blocking clicks
            if (relativeZ >= 0 && relativeZ <= 800) {
                section.style.pointerEvents = 'auto';
            } else {
                section.style.pointerEvents = 'none';
            }
        });

        requestAnimationFrame(() => this.animate());
    }

    updateDepthIndicator() {
        if (this.depthBar) {
            const progress = (this.targetScroll / this.maxScroll) * 100;
            this.depthBar.style.height = `${progress}%`;
        }
    }

    updateNavigation() {
        // Update active item based on current scroll position
        const currentSection = Math.round(this.currentScroll / 2000);
        document.querySelectorAll('.nav-item').forEach((item, index) => {
            if (index === currentSection) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    scrollToSection(sectionIndex) {
        this.targetScroll = sectionIndex * 2000;
        this.targetScroll = Math.max(0, Math.min(this.maxScroll, this.targetScroll));
        this.updateDepthIndicator();
    }
}

// Vertical Navigation Handler
class VerticalNavigation {
    constructor(depthScroll) {
        this.depthScroll = depthScroll;
        this.init();
    }

    init() {
        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const button = e.target.closest('.nav-item');
                const sectionIndex = parseInt(button.dataset.section);
                this.depthScroll.scrollToSection(sectionIndex);
            });
        });

        // Arrow buttons
        document.querySelector('.nav-arrow-up').addEventListener('click', () => {
            const currentSection = Math.round(this.depthScroll.targetScroll / 2000);
            if (currentSection > 0) {
                this.depthScroll.scrollToSection(currentSection - 1);
            }
        });

        document.querySelector('.nav-arrow-down').addEventListener('click', () => {
            const currentSection = Math.round(this.depthScroll.targetScroll / 2000);
            const maxSection = this.depthScroll.sections.length - 1;
            if (currentSection < maxSection) {
                this.depthScroll.scrollToSection(currentSection + 1);
            }
        });

        // Update navigation on scroll
        setInterval(() => {
            this.depthScroll.updateNavigation();
        }, 100);
    }
}

// Pixel Canvas Animation
class PixelCanvas {
    constructor() {
        this.canvas = document.getElementById('pixelCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = ['#9d4edd', '#7209b7', '#e0aaff', '#00f5ff', '#00ff41'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw pixel
            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(
                Math.floor(particle.x),
                Math.floor(particle.y),
                particle.size,
                particle.size
            );
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Mobile Navigation Toggle
class Navigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Scroll effect for navbar
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    handleScroll() {
        const nav = document.querySelector('.pixel-nav');
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 5px 20px rgba(157, 78, 221, 0.5)';
        } else {
            nav.style.boxShadow = 'none';
        }
    }
}

// Typewriter Effect
class Typewriter {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Skill Tag Interaction
class SkillTags {
    constructor() {
        this.tags = document.querySelectorAll('.skill-tag');
        this.init();
    }

    init() {
        this.tags.forEach(tag => {
            tag.addEventListener('click', () => this.handleClick(tag));
            tag.addEventListener('mouseenter', () => this.handleHover(tag));
        });
    }

    handleClick(tag) {
        const level = tag.getAttribute('data-level');

        // Visual feedback
        tag.style.transform = 'scale(1.2) rotate(360deg)';
        tag.style.transition = 'transform 0.5s ease';

        setTimeout(() => {
            tag.style.transform = '';
        }, 500);

        this.showNotification(`Skill Level: ${level}%`);
    }

    handleHover(tag) {
        // Add pulse effect
        tag.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            tag.style.animation = '';
        }, 500);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'pixel-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #9d4edd;
            color: white;
            padding: 15px 25px;
            border: 3px solid #7209b7;
            font-family: 'Press Start 2P', monospace;
            font-size: 0.6rem;
            z-index: 9999;
            animation: slideIn 0.5s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
}

// Project Modal
class ProjectModal {
    constructor() {
        this.modal = document.getElementById('projectModal');
        this.modalContent = document.getElementById('modalContent');
        this.closeBtn = document.querySelector('.close-modal');
        this.projectBtns = document.querySelectorAll('.project-btn');
        this.init();
    }

    init() {
        if (!this.modal || !this.modalContent || !this.closeBtn) {
            console.error('Modal elements not found');
            return;
        }

        // Use event delegation on document to catch button clicks
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.project-btn');
            if (btn) {
                const card = btn.closest('.project-card');
                if (card) {
                    const projectType = card.getAttribute('data-project');
                    this.openModal(projectType);
                }
            }
        });

        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    openModal(projectType) {
        console.log('openModal called for:', projectType);
        const projectData = this.getProjectData(projectType);
        console.log('Project data:', projectData);
        this.modalContent.innerHTML = `
            <h2 class="pixel-text" style="color: #00f5ff; margin-bottom: 20px; font-size: 1.2rem;">
                ${projectData.icon} ${projectData.title}
            </h2>
            <div class="project-tags" style="margin-bottom: 20px;">
                ${projectData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div style="font-size: 0.6rem; line-height: 1.8; color: #c8c8c8;">
                <h3 class="pixel-text" style="color: #9d4edd; margin: 20px 0 10px; font-size: 0.8rem;">DESCRIPTION</h3>
                <p style="margin-bottom: 20px;">${projectData.description}</p>

                <h3 class="pixel-text" style="color: #9d4edd; margin: 20px 0 10px; font-size: 0.8rem;">KEY FEATURES</h3>
                <ul style="list-style: none; padding: 0;">
                    ${projectData.features.map(feature => `
                        <li style="margin: 10px 0; color: #00ff41;">✓ ${feature}</li>
                    `).join('')}
                </ul>

                <h3 class="pixel-text" style="color: #9d4edd; margin: 20px 0 10px; font-size: 0.8rem;">TECHNOLOGIES USED</h3>
                <p>${projectData.technologies}</p>

                ${projectData.achievements ? `
                    <h3 class="pixel-text" style="color: #9d4edd; margin: 20px 0 10px; font-size: 0.8rem;">ACHIEVEMENTS</h3>
                    <p style="color: #00ff41;">${projectData.achievements}</p>
                ` : ''}
            </div>
        `;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    getProjectData(type) {
        const projects = {
            chatbot: {
                title: 'AI-Powered Chatbot',
                icon: '🤖',
                tags: ['Python', 'NLP', 'REST APIs', 'Full-Stack', 'Cloud'],
                description: 'An intelligent conversational AI chatbot capable of handling complex user queries through natural language processing. The system integrates advanced NLP techniques with a robust backend infrastructure and cloud deployment for scalability.',
                features: [
                    'Natural Language Processing for understanding user intent',
                    'Context-aware conversational flow management',
                    'RESTful API integration for frontend-backend communication',
                    'Cloud platform deployment for real-time accessibility',
                    'Machine learning models for improved response accuracy',
                    'User query processing and intelligent response generation'
                ],
                technologies: 'Python, Natural Language Processing (NLP), REST APIs, Cloud Platforms (AWS/Azure/GCP), Machine Learning Libraries, Backend Frameworks',
                achievements: 'Successfully deployed on cloud platform with real-time query processing capabilities'
            },
            streaming: {
                title: 'Streaming Website',
                icon: '📺',
                tags: ['Web Development', 'JavaScript', 'Responsive Design'],
                description: 'A full-featured media streaming platform with categorized content, smooth playback, and optimized performance across all devices. Built with modern web technologies to ensure seamless user experience.',
                features: [
                    'Categorized content library with intuitive navigation',
                    'High-quality video playback with adaptive streaming',
                    'Responsive design for desktop, tablet, and mobile',
                    'Optimized performance and fast loading times',
                    'User-friendly interface with smooth animations',
                    'Search and filter functionality for content discovery'
                ],
                technologies: 'HTML5, CSS3, JavaScript, Video Streaming APIs, Responsive Web Design, Performance Optimization',
                achievements: 'Optimized for multiple screen sizes with excellent performance metrics'
            },
            ecommerce: {
                title: 'E-Commerce Website',
                icon: '🛒',
                tags: ['Web Development', 'Full Stack', 'Database'],
                description: 'A comprehensive e-commerce platform featuring product management, shopping cart functionality, and streamlined checkout process. Designed with user experience and clean code principles in mind.',
                features: [
                    'Dynamic product listing and catalog management',
                    'Shopping cart with add/remove/update functionality',
                    'Responsive design for optimal mobile shopping',
                    'Intuitive navigation and product categorization',
                    'Clean and modern UI design',
                    'Product search and filtering capabilities'
                ],
                technologies: 'HTML5, CSS3, JavaScript, Backend Frameworks, Database Management, Responsive Design',
                achievements: 'Successfully implemented complete e-commerce workflow with smooth user experience'
            },
            airplane: {
                title: 'Airplane Management System',
                icon: '✈️',
                tags: ['Software Development', 'Database', 'CRUD Operations'],
                description: 'A comprehensive airline management system designed to handle flight schedules, bookings, and passenger records efficiently. Implements robust database operations for reliable data management.',
                features: [
                    'Flight schedule creation and management',
                    'Booking system with seat allocation',
                    'Passenger record management and tracking',
                    'CRUD operations for all entities',
                    'Data validation and integrity checks',
                    'Reporting and analytics capabilities'
                ],
                technologies: 'Database Management Systems (MySQL), Backend Development, CRUD Operations, Data Structures, Software Architecture',
                achievements: 'Improved accuracy and organization of airline operations through efficient data handling'
            },
            memory: {
                title: 'Memory Game',
                icon: '🎮',
                tags: ['JavaScript', 'HTML', 'CSS', 'Game Development'],
                description: 'An interactive memory card matching game featuring engaging animations, score tracking, and responsive design. Built with vanilla JavaScript demonstrating event-driven programming concepts.',
                features: [
                    'Card matching game logic with flip animations',
                    'Score tracking and timer functionality',
                    'Responsive UI for all device sizes',
                    'Smooth animations and transitions',
                    'Event-driven programming architecture',
                    'Multiple difficulty levels'
                ],
                technologies: 'JavaScript (Vanilla), HTML5, CSS3, Event-Driven Programming, DOM Manipulation, Animations',
                achievements: 'Created engaging user experience using clean code and efficient algorithms'
            }
        };

        return projects[type] || projects.chatbot;
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        // Pixel-style success animation
        const successMessage = document.createElement('div');
        successMessage.className = 'pixel-success';
        successMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #1a1a2e;
                border: 4px solid #00ff41;
                padding: 40px;
                z-index: 9999;
                text-align: center;
                box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
            ">
                <h3 class="pixel-text" style="color: #00ff41; font-size: 1rem; margin-bottom: 20px;">
                    MESSAGE SENT! ✓
                </h3>
                <p style="font-size: 0.6rem; color: #c8c8c8; font-family: 'Press Start 2P', monospace;">
                    Thank you for reaching out!<br>I'll get back to you soon.
                </p>
            </div>
        `;

        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
            this.form.reset();
        }, 3000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.pixel-box, .project-card, .about-box, .skill-category');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'pixelate 0.6s ease-out forwards';
                    }
                });
            },
            { threshold: 0.1 }
        );

        this.elements.forEach(el => observer.observe(el));
    }
}

// Interactive Avatar
class Avatar {
    constructor() {
        this.avatar = document.querySelector('.avatar-sprite');
        this.init();
    }

    init() {
        if (!this.avatar) return;

        this.avatar.addEventListener('click', () => {
            this.avatar.style.animation = 'none';
            setTimeout(() => {
                this.avatar.style.animation = 'pulse 2s ease-in-out infinite';
            }, 10);

            // Easter egg: Random color change
            const colors = [
                'linear-gradient(135deg, #9d4edd, #00f5ff)',
                'linear-gradient(135deg, #ff006e, #ffbe0b)',
                'linear-gradient(135deg, #00ff41, #00f5ff)',
                'linear-gradient(135deg, #e0aaff, #9d4edd)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.avatar.style.background = randomColor;
        });

        // Mouse follow effect
        document.addEventListener('mousemove', (e) => {
            const rect = this.avatar.getBoundingClientRect();
            const avatarX = rect.left + rect.width / 2;
            const avatarY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - avatarX) / 50;
            const deltaY = (e.clientY - avatarY) / 50;

            this.avatar.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    }
}

// Pixel Cursor Trail (Optional Easter Egg)
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            if (this.trail.length >= this.maxTrail) {
                const oldPixel = this.trail.shift();
                oldPixel.remove();
            }

            const pixel = document.createElement('div');
            pixel.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: #9d4edd;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                opacity: 0.6;
                transition: opacity 0.5s ease;
            `;

            document.body.appendChild(pixel);
            this.trail.push(pixel);

            setTimeout(() => {
                pixel.style.opacity = '0';
            }, 100);
        });
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize depth scroll system
    const depthScroll = new DepthScroll();

    // Initialize vertical navigation
    new VerticalNavigation(depthScroll);

    // Core functionality
    new PixelCanvas();

    // Typewriter effect
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        new Typewriter(typedTextElement, [
            '> Full Stack Developer',
            '> Problem Solver',
            '> Web Development Enthusiast',
            '> AI & ML Explorer',
            '> Clean Code Advocate'
        ], 100);
    }

    // Interactive elements
    new SkillTags();
    const projectModal = new ProjectModal();
    new ContactForm();
    new ScrollAnimations();
    new Avatar();

    // Expose modal function globally for onclick handlers
    window.openProjectModal = function(projectType) {
        projectModal.openModal(projectType);
    };

    // Workaround for 3D transform blocking clicks - use mousedown on document
    document.addEventListener('mousedown', function(e) {
        // Get all project buttons
        const buttons = document.querySelectorAll('.project-btn');

        // Check if click is near any button
        buttons.forEach((button) => {
            const rect = button.getBoundingClientRect();

            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                const card = button.closest('.project-card');
                if (card) {
                    const projectType = card.getAttribute('data-project');
                    projectModal.openModal(projectType);
                }
            }
        });
    });

    // Optional: Uncomment for cursor trail effect
    // new CursorTrail();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading complete animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Console Easter Egg
    console.log('%c👾 PIXEL PORTFOLIO LOADED! 👾', 'font-size: 20px; color: #9d4edd; font-weight: bold;');
    console.log('%cBuilt with pixels and passion ❤️', 'font-size: 12px; color: #00f5ff;');
    console.log('%cAmey Joshi - Computer Science Undergraduate', 'font-size: 12px; color: #00ff41;');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
window.addEventListener('scroll', debounce(() => {
    // Any scroll-based animations can be added here
}, 10));
