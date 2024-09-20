(function() {
  "use strict";

  // Header toggle
  const headerToggleBtn = document.querySelector('.header-toggle');
  const header = document.querySelector('#header');

  headerToggleBtn.addEventListener('click', function() {
    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  });

  // Close header when a menu link is clicked
  const menuLinks = document.querySelectorAll('#navmenu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (header.classList.contains('header-show')) {
        header.classList.remove('header-show');
        headerToggleBtn.classList.add('bi-list');
        headerToggleBtn.classList.remove('bi-x');
      }
    });
  });

  // Dropdown toggle
  const dropdownToggles = document.querySelectorAll('.toggle-dropdown');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
      event.preventDefault();
      toggle.parentElement.classList.toggle('active');
      toggle.nextElementSibling.classList.toggle('dropdown-active');
      event.stopPropagation();
    });
  });

  // Remove preloader on window load
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', function() {
      preloader.remove();
    });
  }

  // Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top');

  function checkScrollTop() {
    if (window.scrollY > 100) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  }

  scrollTopBtn.addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('load', checkScrollTop);
  window.addEventListener('scroll', checkScrollTop);

  // AOS animation initialization
  window.addEventListener('load', function() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  // Typed.js initialization
  const typedElement = document.querySelector('.typed');
  if (typedElement) {
    const typedStrings = typedElement.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // PureCounter initialization
  new PureCounter();

  // Skills progress animation
  const skillsSections = document.querySelectorAll('.skills-animation');
  skillsSections.forEach(section => {
    new Waypoint({
      element: section,
      offset: '80%',
      handler: function() {
        const progressBars = section.querySelectorAll('.progress .progress-bar');
        progressBars.forEach(bar => {
          bar.style.width = bar.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  // GLightbox initialization
  const lightbox = GLightbox({ selector: '.glightbox' });

  // Isotope initialization
  const isotopeContainers = document.querySelectorAll('.isotope-layout');
  isotopeContainers.forEach(container => {
    const layoutMode = container.getAttribute('data-layout') || 'masonry';
    const defaultFilter = container.getAttribute('data-default-filter') || '*';
    const sortBy = container.getAttribute('data-sort') || 'original-order';

    let iso;
    imagesLoaded(container.querySelector('.isotope-container'), function() {
      iso = new Isotope(container.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layoutMode,
        filter: defaultFilter,
        sortBy: sortBy
      });
    });

    const filters = container.querySelectorAll('.isotope-filters li');
    filters.forEach(filter => {
      filter.addEventListener('click', function() {
        container.querySelector('.filter-active').classList.remove('filter-active');
        filter.classList.add('filter-active');
        iso.arrange({ filter: filter.getAttribute('data-filter') });
        AOS.refresh();
      });
    });
  });

  // Swiper initialization
  window.addEventListener('load', function() {
    const swiperContainers = document.querySelectorAll('.init-swiper');
    swiperContainers.forEach(swiper => {
      const config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML);
      new Swiper(swiper, config);
    });
  });

  // Smooth scroll to section from URL hash
  window.addEventListener('load', function() {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(function() {
          window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  // Update active menu link on scroll
  const navMenuLinks = document.querySelectorAll('.navmenu a');

  function updateActiveLink() {
    const position = window.scrollY + 200;
    navMenuLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) {
        if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
          document.querySelector('.navmenu a.active').classList.remove('active');
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('load', updateActiveLink);
  window.addEventListener('scroll', updateActiveLink);

})();
