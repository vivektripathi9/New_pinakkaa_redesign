// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            updateNavbarAppearance();
        });
    }
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                updateNavbarAppearance();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburger && navMenu.classList.contains('active')) {
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                updateNavbarAppearance();
            }
        }
    });
    
    // Navbar appearance:
    // - Slight transparent when hero is visible
    // - Return to normal opacity after scrolling past hero
    const heroSection = document.querySelector('.hero-section');
    let isHeroVisible = false;

    function updateNavbarAppearance() {
        if (!navbar) return;
        const menuOpen = navMenu && navMenu.classList.contains('active');
        if (isHeroVisible && !menuOpen) {
            navbar.classList.add('navbar-over-hero');
        } else {
            navbar.classList.remove('navbar-over-hero');
        }
    }

    if (heroSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                isHeroVisible = entries[0].isIntersecting;
                updateNavbarAppearance();
            },
            { threshold: 0.15 }
        );
        observer.observe(heroSection);
    } else if (heroSection) {
        const fallbackHandler = function() {
            const rect = heroSection.getBoundingClientRect();
            isHeroVisible = rect.bottom > 80 && rect.top < window.innerHeight;
            updateNavbarAppearance();
        };
        window.addEventListener('scroll', fallbackHandler);
        fallbackHandler();
    } else {
        // Non-home pages don't have hero section; keep normal navbar opacity.
        isHeroVisible = false;
        updateNavbarAppearance();
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80; // Account for fixed navbar height
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
