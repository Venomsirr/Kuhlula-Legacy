// KUHLULA LEGACY - SITE INTERACTIONS

const CONTACT_EMAIL = 'info.kuhlulalegacy@gmail.com';

function getSavedTheme() {
    try {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
    } catch (error) {
        console.warn('Theme preference could not be read from local storage.', error);
        return 'dark';
    }
}

function updateThemeToggle(theme) {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    toggle.textContent = nextTheme === 'light' ? 'Light' : 'Dark';
    toggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    toggle.setAttribute('title', `Switch to ${nextTheme} mode`);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeToggle(theme);

    try {
        localStorage.setItem('theme', theme);
    } catch (error) {
        console.warn('Theme preference could not be saved to local storage.', error);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.hamburger');

    if (!menu || !toggle) return;
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('menu-open');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.hamburger');

    if (!menu || !toggle) return;
    const isOpen = menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('menu-open', isOpen);
}

function submitByEmail(form) {
    const values = Array.from(new FormData(form).entries())
        .filter(([, value]) => typeof value === 'string' && value.trim())
        .map(([key, value]) => {
            const field = form.elements.namedItem(key);
            const label = field && field.tagName === 'SELECT'
                ? field.selectedOptions[0].text
                : value.trim();
            return `${key.replace(/[_-]/g, ' ')}: ${label}`;
        });
    const name = form.elements.namedItem('name')?.value.trim();
    const isContactForm = form.id === 'contactForm';
    const subject = isContactForm
        ? `Website enquiry${name ? ` from ${name}` : ''}`
        : `Quote request${name ? ` from ${name}` : ''}`;
    const body = [
        'Hello Kuhlula Legacy,',
        '',
        ...values,
        '',
        'Sent from the Kuhlula Legacy website.'
    ].join('\r\n');
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
}

function initPageInteractions() {
    setTheme(getSavedTheme());

    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    const mobileToggle = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', toggleMobileMenu);

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        document.addEventListener('click', event => {
            if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                closeMobileMenu();
            }
        });
    }

    document.querySelectorAll('#contactForm, #quoteRequestForm, #quoteForm').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (!form.reportValidity()) return;
            submitByEmail(form);
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && mobileMenu?.classList.contains('active')) {
            closeMobileMenu();
            mobileToggle?.focus();
        }
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll(
            '.service-card, .highlight-item, .principle-card, .leader-card, ' +
            '.business-line-card, .insight-card, .opportunity-card, .faq-item, ' +
            '.contact-info-box, .contact-form-box, .quote-form-wrapper'
        ).forEach(element => {
            element.classList.add('fade-up');
            revealObserver.observe(element);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageInteractions, { once: true });
} else {
    initPageInteractions();
}
