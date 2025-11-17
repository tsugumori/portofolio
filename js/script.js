// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault();
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
    '.skill-card, .timeline-item, .project-featured, .about-content, .contact-content'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--color-accent-primary)';
            } else {
                navLink.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ===================================
// TYPING EFFECT FOR CODE WINDOW (OPTIONAL)
// ===================================
function typeCode() {
    const codeElement = document.querySelector('.window-content code');
    if (!codeElement) return;

    const originalHTML = codeElement.innerHTML;
    codeElement.innerHTML = '';
    codeElement.style.opacity = '0';

    setTimeout(() => {
        codeElement.innerHTML = originalHTML;
        codeElement.style.opacity = '1';
        codeElement.style.transition = 'opacity 0.5s ease';
    }, 500);
}

// Initialize typing effect after page load
window.addEventListener('load', typeCode);

// ===================================
// STATS COUNTER ANIMATION
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetValue = parseInt(statNumber.textContent);
            const suffix = statNumber.textContent.replace(/[0-9]/g, '');

            statNumber.dataset.suffix = suffix;
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(statNumber);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// CHART BARS ANIMATION
// ===================================
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.chart-bar');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.opacity = '1';
                }, index * 100);
            });
            chartObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const dashboardChart = document.querySelector('.dashboard-chart');
if (dashboardChart) {
    chartObserver.observe(dashboardChart);
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(setActiveNavLink, 10));

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================
// Add keyboard navigation support
document.querySelectorAll('.btn, .nav-link').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
        }
    });
});

// Add focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// PRELOAD IMAGES (IF ANY)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// FORM HANDLING (IF CONTACT FORM EXISTS)
// ===================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Here you would typically send the data to a server
        console.log('Form submitted:', Object.fromEntries(formData));

        // Show success message
        alert('¡Mensaje enviado! Te contactaré pronto.');
        contactForm.reset();
    });
}

// ===================================
// EASTER EGG: Console Message
// ===================================
console.log(
    '%c¡Hola Developer! 👋',
    'color: #00d9ff; font-size: 20px; font-weight: bold;'
);
console.log(
    '%c¿Te gusta el código? Revisa el repositorio en GitHub',
    'color: #b4b4c8; font-size: 14px;'
);
console.log(
    '%cDiseñado y desarrollado por Lucas Troncoso',
    'color: #00ff99; font-size: 12px;'
);

// ===================================
// PARTICLES BACKGROUND (OPTIONAL ENHANCEMENT)
// ===================================
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--color-accent-primary);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(0) translateX(-10px); }
            75% { transform: translateY(20px) translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    hero.appendChild(particlesContainer);
}

// Initialize particles (optional, can be resource-intensive)
// Uncomment to enable:
// window.addEventListener('load', createParticles);

// ===================================
// EXPORT FOR TESTING
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        animateCounter,
        typeCode
    };
}
