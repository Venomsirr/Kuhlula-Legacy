// ============================================
// KUHLULA LEGACY - NAVIGATION COMPONENT
// ============================================

const NavigationComponent = {
    render(currentPage = 'home') {
        const navLinks = [
            { href: 'index.html', label: 'Home', page: 'home' },
            { href: 'about.html', label: 'About', page: 'about' },
            { href: 'team.html', label: 'Team', page: 'team' },
            { href: 'services.html', label: 'Business Lines', page: 'business-lines' },
            { href: 'fleet.html', label: 'Career', page: 'career' },
            { href: 'gallery.html', label: 'Insights', page: 'insights' }
        ];

        const isActive = page => page === currentPage ? 'active' : '';

        return `
            <nav class="nav-wrapper" role="navigation" aria-label="Main navigation">
                <div class="nav-container container">
                    <a class="brand" href="index.html">
                        <span class="brand-mark" aria-hidden="true">K</span>
                        <span class="brand-name">Kuhlula Legacy</span>
                    </a>
                    <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-menu" id="navMenu">
                        ${navLinks.map(link => `
                            <li><a href="${link.href}" class="nav-link ${isActive(link.page)}">${link.label}</a></li>
                        `).join('')}
                        <li><a href="contact.html" class="nav-quote btn btn-nav">Contact</a></li>
                        <li><button id="themeToggle" class="theme-toggle" aria-label="Toggle theme">🌙</button></li>
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
                document.body.style.overflow = expanded ? 'hidden' : '';
            });

            document.addEventListener('click', (event) => {
                if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        }

        const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('.html', '');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const currentTheme = localStorage.getItem('theme') || 'dark';
            document.body.classList.toggle('light-mode', currentTheme === 'light');
            themeToggle.textContent = currentTheme === 'light' ? '☀️' : '🌙';

            themeToggle.addEventListener('click', () => {
                const isLight = document.body.classList.toggle('light-mode');
                const newTheme = isLight ? 'light' : 'dark';
                localStorage.setItem('theme', newTheme);
                themeToggle.textContent = isLight ? '☀️' : '🌙';
            });
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationComponent;
}
