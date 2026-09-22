const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        siteNav.classList.toggle('site-nav--open', !isExpanded);
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            siteNav.classList.remove('site-nav--open');
        });
    });

    document.addEventListener('click', (event) => {
        const clickInsideNav = siteNav.contains(event.target);
        const clickToggle = navToggle.contains(event.target);

        if (!clickInsideNav && !clickToggle && siteNav.classList.contains('site-nav--open')) {
            navToggle.setAttribute('aria-expanded', 'false');
            siteNav.classList.remove('site-nav--open');
        }
    });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}

const blogToggleButtons = document.querySelectorAll('.blog-toggle');
blogToggleButtons.forEach((button) => {
    const articleId = button.getAttribute('aria-controls');
    const article = articleId ? document.getElementById(articleId) : null;

    if (!article) return;

    const excerpt = button.closest('.blog-content')?.querySelector('.blog-excerpt');
    const setState = (isOpen) => {
        const label = button.querySelector('.blog-toggle-label');
        if (label) {
            label.textContent = isOpen ? 'დახურვა' : 'სრულად წაიკითხე';
        }

        button.setAttribute('aria-expanded', String(isOpen));
        article.classList.toggle('is-open', isOpen);
        article.hidden = !isOpen;

        if (excerpt) {
            excerpt.style.display = isOpen ? 'none' : 'block';
        }
    };

    article.hidden = true;
    article.classList.remove('is-open');
    setState(false);

    button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        setState(!isOpen);
    });
});
