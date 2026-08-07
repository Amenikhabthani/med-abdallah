/**
* Template Name: LeadPage
* Template URL: https://bootstrapmade.com/leadpage-bootstrap-landing-page-template/
* Updated: Aug 12 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: false,
    closeOnOutsideClick: true
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Testimonial preview toggle
   */
  document.querySelectorAll('.testimonial-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const testimonialItem = toggle.closest('.testimonial-item');
      const preview = testimonialItem.querySelector('.testimonial-preview-text');
      const fullLink = testimonialItem.querySelector('.testimonial-full-link');
      const isExpanded = preview.classList.toggle('expanded');

      if (fullLink) {
        fullLink.classList.toggle('is-visible', isExpanded);
      }

      toggle.textContent = isExpanded ? 'Read Less' : 'Read More';
      toggle.setAttribute('aria-expanded', String(isExpanded));
    });
  });

  /**
   * Contact form submission with success/error handling
   */
  const contactForm = document.querySelector('#contactForm');

  if (contactForm) {
    const loading = contactForm.querySelector('.loading');
    const errorMessage = contactForm.querySelector('.error-message');
    const sentMessage = contactForm.querySelector('.sent-message');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      loading.style.display = 'block';
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
      sentMessage.style.display = 'none';
      submitButton.disabled = true;

      if (contactForm.action.includes('your-form-id')) {
        loading.style.display = 'none';
        submitButton.disabled = false;
        errorMessage.textContent = 'Please configure your Formspree form ID to enable submissions.';
        errorMessage.style.display = 'block';
        return;
      }

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            contactForm.reset();
            sentMessage.style.display = 'block';
            sentMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            throw new Error('Unable to send message');
          }
        })
        .catch(() => {
          errorMessage.textContent = 'There was an issue sending your message. Please try again later.';
          errorMessage.style.display = 'block';
        })
        .finally(() => {
          loading.style.display = 'none';
          submitButton.disabled = false;
        });
    });
  }

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Project grid show more / show less toggle
   */
  const projectToggleBtn = document.getElementById('toggle-projects');
  if (projectToggleBtn) {
    const projectCards = Array.from(document.querySelectorAll('#project-references .portfolio-item'));
    const visibleCount = 4;
    const hiddenCards = projectCards.slice(visibleCount);

    hiddenCards.forEach(card => card.classList.add('project-hidden'));

    projectToggleBtn.addEventListener('click', () => {
      const expanded = projectToggleBtn.getAttribute('aria-expanded') === 'true';
      hiddenCards.forEach(card => card.classList.toggle('project-hidden', expanded));
      projectToggleBtn.textContent = expanded ? 'Show More Projects' : 'Show Less';
      projectToggleBtn.setAttribute('aria-expanded', String(!expanded));
    });
  }

})();
/**
 * Additions for the split Brands Wall + Project Gallery sections.
 * Append inside (or after) the existing main.js IIFE — it's written
 * as its own self-contained block so it's safe to include either way.
 *
 * Note: project filtering itself needs no code here — it's handled
 * by the generic `.isotope-layout` initializer that already exists
 * in main.js. This file only adds two small enhancements:
 *   1. Pause offscreen project videos (saves battery/CPU on long scrolls)
 *   2. Fill in the live (count) badge on each filter tab
 *
 * You can safely delete the old "#toggle-projects" show more/less
 * block from main.js — that id no longer exists in the new markup,
 * so it's dead code (harmless if left, but no longer doing anything).
 */
(function() {
  "use strict";

  /**
   * Pause project videos once they scroll out of view, resume when
   * they scroll back in. With 9+ project cards (and more coming),
   * autoplaying every video at once is unnecessary battery/CPU load.
   */
  const galleryVideos = document.querySelectorAll('#project-references video');
  if (galleryVideos.length && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    }, { threshold: 0.2 });

    galleryVideos.forEach((vid) => videoObserver.observe(vid));
  }

  /**
   * Live counts on the project filter tabs, e.g. "Flooring Installs (5)".
   * Reads straight from the DOM, so it never goes stale as projects
   * are added or re-tagged — no manual number-updating required.
   */
  const filterList = document.querySelector('#project-references .isotope-filters');
  if (filterList) {
    const allItems = document.querySelectorAll('#project-references .portfolio-item');

    filterList.querySelectorAll('li[data-filter]').forEach((li) => {
      const filter = li.getAttribute('data-filter');
      const countEl = li.querySelector('.filter-count');
      if (!countEl) return;

      const count = filter === '*'
        ? allItems.length
        : document.querySelectorAll('#project-references ' + filter).length;

      countEl.textContent = '(' + count + ')';
    });
  }

})();