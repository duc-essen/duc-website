/**
 * Layout-weite Browser-Scripts:
 * - Aktuelles Jahr in #currentYear
 * - Mobile-Menu-Toggle
 * - Navbar-Scroll-Effect (scrolled-Klasse)
 * - Fade-In-Animation per IntersectionObserver
 * - Smooth-Scroll fuer Anchor-Links + History API fuer teilbare URLs
 * - Active-Menu-Item per Scroll-Spy + URL-Sync (replaceState)
 * - Back-to-Top-Button (Sichtbarkeit + Scroll)
 *
 * Wird in BaseLayout.astro per `<script>` eingebunden (Astro bundlet
 * automatisch). import.meta.env.BASE_URL wird zur Build-Zeit aufgeloest.
 */

export function initLayout(): void {
  const BASE_URL: string = import.meta.env.BASE_URL;
  const basePath = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const isOnePager =
    window.location.pathname === basePath ||
    window.location.pathname === basePath + '/';

  function urlForSlug(slug: string): string {
    if (!slug || slug === 'home') return basePath + '/';
    return basePath + '/' + slug;
  }

  // --- Current Year ---
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // --- Navbar-Scroll-Effect ---
  // Auf Detail-Seiten (!isOnePager) bleibt die Navbar immer "scrolled" — sonst
  // waere sie transparent vor weissem Hintergrund und das Logo wuerde verschwinden.
  const navbar = document.getElementById('navbar');
  const onScroll = (): void => {
    if (!navbar) return;
    if (!isOnePager) {
      navbar.classList.add('scrolled');
      return;
    }
    if (window.scrollY > 100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // --- Fade-In-Animation ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

  // --- Smooth-Scroll + History API ---
  // Auf One-Pager: Klick auf #angebote scrollt + setzt URL zu /<base>/angebote.
  // Refresh auf /<base>/angebote laedt dann die Detail-Seite (statische Route).
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#main-content') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (isOnePager) {
        const slug = href.substring(1);
        history.pushState({ slug }, '', urlForSlug(slug));
      }
    });
  });

  // --- Back/Forward-Button: zur passenden Section scrollen ---
  window.addEventListener('popstate', () => {
    if (!isOnePager) return;
    const rest = window.location.pathname
      .replace(basePath, '')
      .replace(/^\/+|\/+$/g, '');
    if (!rest) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.getElementById(rest);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // --- Active-Menu-Item per Scroll-Spy + URL-Sync ---
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinksAll = document.querySelectorAll<HTMLAnchorElement>(
    '.nav-links a[href^="#"]'
  );
  let lastUrlSlug = '';
  const updateActive = (): void => {
    const scrollPos = window.scrollY + 150;
    let currentSlug = '';
    sections.forEach((section) => {
      const top = section.offsetTop;
      const h = section.offsetHeight;
      const id = section.getAttribute('id') || '';
      if (scrollPos >= top && scrollPos < top + h) {
        currentSlug = id;
        navLinksAll.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
    // Bei Scroll nur URL synchronisieren (kein neuer History-Eintrag).
    if (isOnePager && currentSlug && currentSlug !== lastUrlSlug) {
      lastUrlSlug = currentSlug;
      history.replaceState(null, '', urlForSlug(currentSlug));
    }
  };
  window.addEventListener('scroll', updateActive);
  updateActive();

  // --- Back-to-Top ---
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
