document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeCustomCursor();
    initializeRadialMenu();
    initializeScrollProgress();
    initializeHorizontalScroll();
    initializeModals();
    initializeSmoothScroll();
    const scrollWrapper = document.querySelector('.horizontal-scroll-wrapper');
    if (scrollWrapper) {
        scrollWrapper.scrollLeft = 0;

        setTimeout(() => {
            scrollWrapper.scrollLeft = 0;
        }, 50);
    }
});
function initializeAOS() {
    AOS.init({
        duration: 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        once: true,
        offset: 50,
        delay: 0,
        anchorPlacement: 'top-bottom'
    });
}
function initializeCustomCursor() {
    if (window.innerWidth < 768) return;

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    const hoverElements = document.querySelectorAll('a, button, .bento-card, .project-panel, .stat-bubble');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        polaroid.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    });
}
function initializeRadialMenu() {
    const radialMenu = document.getElementById('radial-menu');
    const menuTrigger = document.getElementById('menu-trigger');

    if (!radialMenu || !menuTrigger) return;

    menuTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        radialMenu.classList.toggle('active');
    });

}
function initializeScrollProgress() {
    const progressCircle = document.querySelector('.progress-ring-circle');
    const progressText = document.querySelector('.progress-text');

    if (!progressCircle || !progressText) return;

    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        const offset = circumference - (scrollPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressText.textContent = Math.round(scrollPercent) + '%';
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();
}
function initializeHorizontalScroll() {
    const scrollWrapper = document.querySelector('.horizontal-scroll-wrapper');

    if (!scrollWrapper) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    scrollWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollWrapper.style.cursor = 'grabbing';
        startX = e.pageX - scrollWrapper.offsetLeft;
        scrollLeft = scrollWrapper.scrollLeft;
    });

    scrollWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        scrollWrapper.style.cursor = 'grab';
    });

    scrollWrapper.addEventListener('mouseup', () => {
        isDown = false;
        scrollWrapper.style.cursor = 'grab';
    });

    scrollWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollWrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollWrapper.scrollLeft = scrollLeft - walk;
    });
    scrollWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollWrapper.scrollBy({ left: -300, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollWrapper.scrollBy({ left: 300, behavior: 'smooth' });
        }
    });
    scrollWrapper.setAttribute('tabindex', '0');
}
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}
function initializeModals() {

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
function initializeParallax() {
    const floatingElements = document.querySelectorAll('.photo-frame-wrapper');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        floatingElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const currentRotation = el.classList.contains('photo-frame-wrapper') ? 'rotate(3deg)' : '';
            el.style.transform = `${currentRotation} translateY(${yPos}px)`;
        });
    });
}

initializeParallax();
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    const elements = document.querySelectorAll('.bento-card, .mag-spread, .project-panel');
    elements.forEach(el => observer.observe(el));
}

observeElements();
console.log('%c✨ Welcome to Aditi\'s Portfolio ✨', 'color: #FF69B4; font-size: 24px; font-weight: bold; font-family: "Abril Fatface", serif;');
console.log('%cLike what you see? Let\'s connect!', 'color: #B76E79; font-size: 16px; font-family: "Space Grotesk", sans-serif;');
console.log('%c📧 aditi7inc@gmail.com', 'color: #2D2D2D; font-size: 14px;');

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
const debouncedResize = debounce(() => {
    AOS.refresh();
}, 250);

window.addEventListener('resize', debouncedResize);
window.addEventListener('load', () => {

    window.scrollTo(0, 0);
    const scrollWrapper = document.querySelector('.horizontal-scroll-wrapper');
    if (scrollWrapper) {
        scrollWrapper.scrollLeft = 0;
    }

    document.body.classList.add('loaded');
});
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
