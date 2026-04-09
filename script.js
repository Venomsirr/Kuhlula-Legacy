// ============================================
// KUHLULA LEGACY - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => loader.classList.add('hidden'), 600);
        });
    }

    if (typeof NavigationComponent !== 'undefined') {
        NavigationComponent.init();
    }

    const animateElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const service = formData.get('service');
            const message = formData.get('message');

            if (!name || !email || !message) {
                alert('Please fill in the required fields.');
                return;
            }

            const subject = `Kuhlula Legacy Quote Request - ${name}${company ? ' from ' + company : ''}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0ACompany: ${company || 'Not provided'}%0D%0AService: ${service || 'Not specified'}%0D%0AMessage: ${message}`;
            window.location.href = `mailto:info@kuhlulalegacy.co.za?subject=${encodeURIComponent(subject)}&body=${body}`;
        });
    }

    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you. Your quote request has been submitted.');
            this.reset();
        });
    }
});
