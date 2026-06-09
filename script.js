// ============================================
// KUHLULA LEGACY - MAIN JAVASCRIPT
// Modern Interactive Features
// ============================================

// === THEME TOGGLE (DARK/LIGHT MODE) ===
function initTheme() {
    // Default to dark mode, allow user override via localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        // show the action available to the user rather than the current mode
        toggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
        toggle.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
}

// Initialize theme on page load (default dark mode)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// Attach theme toggle handler once DOM is ready (centralized toggle in navigation)
document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
});

// === MOBILE MENU TOGGLE ===
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
}

// Close mobile menu when link is clicked
document.addEventListener('DOMContentLoaded', function() {
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('mobileMenu');
            if (menu) menu.style.display = 'none';
        });
    });
});

// === STATS COUNTER ANIMATION ===
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target')) || 0;
        const isPercentage = stat.getAttribute('data-target') === '99';
        
        // Check if element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(stat, target, isPercentage);
                    observer.unobserve(entry);
                }
            });
        });
        
        observer.observe(stat);
    });
}

function animateCounter(element, target, isPercentage = false) {
    let current = 0;
    const increment = Math.ceil(target / 50);
    const duration = 2000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        current = Math.floor(target * progress);
        
        if (isPercentage) {
            element.textContent = current + '%';
        } else {
            element.textContent = current + (current === 100 ? '%' : current > 50 ? '' : '');
            if (element.textContent.includes('+') === false && target > 50) {
                element.textContent = current + '+';
            }
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + (isPercentage ? '%' : '+');
        }
    }
    
    update();
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// === SCROLL TO TOP BUTTON ===
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = 'var(--shadow)';
        }
    }
});

// === FADE IN ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .highlight-item, .principle-card, .leader-card, ' +
        '.business-line-card, .insight-card, .opportunity-card, .faq-item, ' +
        '.contact-info-box, .contact-form-box, .quote-form-wrapper'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animate stats
    animateStats();
});



// === FORM VALIDATION ===
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Add real-time validation to forms
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ff6b6b';
                this.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
            } else {
                this.style.borderColor = '#DEDFE1';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#ff6b6b';
                this.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
            } else {
                this.style.borderColor = '#DEDFE1';
                this.style.boxShadow = 'none';
            }
        });
    });
});

// === NAVBAR ACTIVE LINK HIGHLIGHTING ===
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation || 
            (href === 'index.html' && currentLocation.endsWith('/')) ||
            (href === currentLocation.split('/').pop())) {
            link.classList.add('active');
        }
    });
});

console.log('Kuhlula Legacy - Website Loaded Successfully');
console.log('Kuhlula Legacy - Website Loaded Successfully');

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!name || !email || !message) {
                alert('Please fill in the required fields.');
                return;
            }

            const subject = `Kuhlula Legacy Contact - ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
            window.location.href = `mailto:info@kuhlulalegacy.co.za?subject=${encodeURIComponent(subject)}&body=${body}`;
        });
    }

    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');

            if (!name || !email || !phone || !message) {
                alert('Please fill in the required fields.');
                return;
            }

            const subject = `Kuhlula Legacy Quote Request - ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AMessage: ${message}`;
            window.location.href = `mailto:info@kuhlulalegacy.co.za?subject=${encodeURIComponent(subject)}&body=${body}`;
        });
    }
});

