// ============================================
// KUHLULA LEGACY - NAVIGATION COMPONENT
// ============================================

const NavigationComponent = {
    render(currentPage = 'home') {
        const navLinks = [
            { href: 'index.html', label: 'Home', page: 'home' },
            { href: 'about.html', label: 'About', page: 'about' },
            { href: 'business-lines.html', label: 'Business Lines', page: 'business-lines' },
            { href: 'careers.html', label: 'Careers', page: 'careers' }
        ];

        const isActive = page => page === currentPage ? 'active' : '';

        return `
            <nav class="nav-wrapper" role="navigation" aria-label="Main navigation">
                <div class="nav-container container">
                    <a class="brand" href="index.html">
                        <img src="assets/images/logo-bg.jpeg" alt="Kuhlula Legacy logo" class="brand-logo">
                        <span class="brand-name">Kuhlula Legacy</span>
                    </a>
                    <button class="menu-toggle" id="menuToggle" aria-label="Open navigation menu" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-menu" id="navMenu">
                        ${navLinks.map(link => `
                            <li><a href="${link.href}" class="nav-link ${isActive(link.page)}">${link.label}</a></li>
                        `).join('')}
                        <li><a href="contact.html" class="nav-quote btn btn-nav">Contact</a></li>
                        <li><button class="theme-toggle" id="themeToggle" title="Toggle dark/light mode">Light</button></li>
                    </ul>
                </div>
            </nav>
        `;
    },

    init() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const expanded = navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                menuToggle.setAttribute('aria-label', expanded ? 'Close navigation menu' : 'Open navigation menu');
                document.body.style.overflow = expanded ? 'hidden' : '';
            });

            document.addEventListener('click', (event) => {
                if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'Open navigation menu');
                    document.body.style.overflow = '';
                }
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'Open navigation menu');
                    document.body.style.overflow = '';
                    menuToggle.focus();
                }
            });
        }

        const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
        const currentPage = pageName === 'services' ? 'business-lines' : pageName;
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('.html', '');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationComponent;
}

// Initialize navigation component when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    NavigationComponent.init();
});
