document.addEventListener('DOMContentLoaded', () => {
  "use strict";
  
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Mobile nav toggle
   */
  const body = document.body;
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  function toggleMobileNav(show) {
    if (show) {
      body.classList.add('mobile-nav-active');
      mobileNavShow.classList.add('d-none');
      mobileNavHide.classList.remove('d-none');
    } else {
      body.classList.remove('mobile-nav-active');
      mobileNavShow.classList.remove('d-none');
      mobileNavHide.classList.add('d-none');
    }
  }

  mobileNavShow.addEventListener('click', () => toggleMobileNav(true));
  mobileNavHide.addEventListener('click', () => toggleMobileNav(false));

  // Opcional: cerrar menú al hacer clic en un enlace del navbar
  document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', (e) => {
    const parent = link.parentElement;
    const isDropdownToggle = parent.classList.contains('dropdown') && link.nextElementSibling;

    // Si es el botón de despliegue (como "Servicios"), evitar navegación y NO cerrar el menú
    if (isDropdownToggle) {
      e.preventDefault(); // Solo despliega el submenú
    }

    // Si es una subopción dentro del dropdown y estamos en móvil, cerrar el menú
    if (!isDropdownToggle && body.classList.contains('mobile-nav-active')) {
      toggleMobileNav(false);
    }
  });
});
  document.querySelectorAll('.navbar .dropdown a.dropdown-link').forEach(link => {
  link.addEventListener('click', (e) => {
    // Previene que Bootstrap cierre el menú antes de cambiar la vista
    e.stopPropagation();
  });
});

const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

navDropdowns.forEach(el => {
  el.addEventListener('click', function(event) {
    if (document.body.classList.contains('mobile-nav-active')) {
      event.preventDefault(); // 👈 evita navegación
      this.classList.toggle('active');

      const submenu = this.nextElementSibling;
      if (submenu) {
        submenu.classList.toggle('dropdown-active');
      }

      const dropDownIndicator = this.querySelector('.dropdown-indicator');
      if (dropDownIndicator) {
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    }
  });
});

  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });


  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});