/**
 * Lenis Smooth Scroll Initialization
 * Provides butter-smooth scrolling across the entire site
 * https://lenis.darkroom.engineering/
 */

(function() {
  'use strict';

  // Wait for Lenis to be available
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded');
    return;
  }

  // Initialize Lenis with optimized settings
  const lenis = new Lenis({
    duration: 1.2,           // Scroll animation duration
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out expo
    orientation: 'vertical', // Vertical scroll
    gestureOrientation: 'vertical',
    smoothWheel: true,       // Smooth mouse wheel scrolling
    syncTouch: false,        // Disable for better mobile performance
    touchMultiplier: 2,      // Touch scroll sensitivity
    infinite: false,         // No infinite scroll
  });

  // Expose lenis instance globally for other scripts
  window.lenis = lenis;

  // Animation frame loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Emit scroll events for compatibility with existing scroll handlers
  lenis.on('scroll', ({ scroll, velocity, direction, progress }) => {
    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('lenis-scroll', {
      detail: { scroll, velocity, direction, progress }
    }));
  });

  // Handle anchor links with smooth scrolling
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;

    const hash = target.getAttribute('href');
    if (hash === '#') return;

    const element = document.querySelector(hash);
    if (element) {
      e.preventDefault();
      lenis.scrollTo(element, {
        offset: -80, // Account for fixed header
        duration: 1.2
      });
      // Update URL without jumping
      history.pushState(null, null, hash);
    }
  });

  // Handle scrollIntoView calls by patching Element.prototype
  const originalScrollIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function(options) {
    if (window.lenis && options?.behavior === 'smooth') {
      window.lenis.scrollTo(this, {
        offset: -80,
        duration: 1.2
      });
    } else {
      originalScrollIntoView.call(this, options);
    }
  };

  // Pause Lenis when opening modals or overlays
  document.addEventListener('modal-open', () => lenis.stop());
  document.addEventListener('modal-close', () => lenis.start());

  // Handle elements that should prevent smooth scroll (modals, dropdowns)
  // Elements with [data-lenis-prevent] will use native scroll

  // Re-enable on resize (handles orientation changes)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      lenis.resize();
    }, 150);
  });

  // Log successful initialization
  console.log('Lenis smooth scroll initialized');

})();
