/* ═══════════════════════════════════════════
   OPIUM RESTAURANT — JAVASCRIPT
   Home of Ambiance
═══════════════════════════════════════════ */

'use strict';

/* ─── DOM READY ─── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCustomCursor();
  initNavigation();
  initHeroAnimations();
  initParticles();
  initMenuTabs();
  initGalleryFilter();
  initReservationForm();
  initTestimonialCarousel();
  initScrollReveal();
  initMobileMenu();
  addRevealClasses();
});

/* ═══════════════════════════════════════════
   LOADER
═══════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      triggerHeroReveal();
    }, 2800);
  });

  // Ensure body doesn't scroll during load
  document.body.style.overflow = 'hidden';

  // Fallback if load event already fired
  if (document.readyState === 'complete') {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      triggerHeroReveal();
    }, 2800);
  }
}

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════ */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  if (!cursor || !dot) return;

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth cursor follow
  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .menu-item, .gallery-item, .event-card, .tab-btn, .filter-btn, .t-dot'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    dot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    dot.style.opacity = '1';
  });
}

/* ═══════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════ */
function initNavigation() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }, { passive: true });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

/* ═══════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', openMobileMenu);
  mobileClose.addEventListener('click', closeMobileMenu);

  // Close on outside click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
  });
}

function openMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ═══════════════════════════════════════════
   HERO ANIMATIONS
═══════════════════════════════════════════ */
function triggerHeroReveal() {
  const eyebrow = document.querySelector('.hero-eyebrow');
  const titleLines = document.querySelectorAll('.hero-title-line');
  const sub = document.querySelector('.hero-sub');
  const ctas = document.querySelector('.hero-ctas');

  // Staggered reveal
  if (eyebrow) eyebrow.classList.add('visible');
  titleLines.forEach(line => line.classList.add('visible'));
  setTimeout(() => { if (sub) sub.classList.add('visible'); }, 100);
  setTimeout(() => { if (ctas) ctas.classList.add('visible'); }, 200);
}

function initHeroAnimations() {
  // Parallax on hero orbs
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, i) => {
      const speed = 0.1 + (i * 0.05);
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

/* ═══════════════════════════════════════════
   PARTICLE FIELD
═══════════════════════════════════════════ */
function initParticles() {
  const field = document.getElementById('particleField');
  if (!field) return;

  const COUNT = 60;
  const particles = [];

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 2 + 0.5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 8 + Math.random() * 20;
    const delay = Math.random() * -20;
    const opacity = Math.random() * 0.4 + 0.05;

    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      background: rgba(201, 168, 76, ${opacity});
      border-radius: 50%;
      animation: particleFloat ${duration}s ${delay}s ease-in-out infinite;
      pointer-events: none;
    `;
    field.appendChild(p);
    particles.push(p);
  }

  // Inject keyframe
  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: var(--op, 0.2); }
        25% { transform: translate(${randRange(-30, 30)}px, ${randRange(-30, 30)}px) scale(1.2); }
        50% { transform: translate(${randRange(-20, 20)}px, ${randRange(-40, 40)}px) scale(0.8); }
        75% { transform: translate(${randRange(-30, 30)}px, ${randRange(-20, 20)}px) scale(1.1); }
      }
    `;
    document.head.appendChild(style);
  }
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/* ═══════════════════════════════════════════
   MENU TABS
═══════════════════════════════════════════ */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels with fade
      panels.forEach(panel => {
        panel.classList.remove('active');
        panel.style.animation = '';
      });

      const target = document.getElementById(`tab-${targetTab}`);
      if (target) {
        target.classList.add('active');
        target.style.animation = 'panelFadeIn 0.4s ease forwards';
      }
    });
  });

  // Inject panel animation
  if (!document.getElementById('tabStyle')) {
    const style = document.createElement('style');
    style.id = 'tabStyle';
    style.textContent = `
      @keyframes panelFadeIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ═══════════════════════════════════════════
   GALLERY FILTER
═══════════════════════════════════════════ */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter items
      galleryItems.forEach((item, i) => {
        const category = item.getAttribute('data-category');
        const show = filter === 'all' || category === filter;

        if (show) {
          item.style.display = '';
          item.style.animation = `galleryReveal 0.5s ${i * 0.05}s ease forwards`;
          item.style.opacity = '0';
        } else {
          item.style.animation = 'galleryHide 0.3s ease forwards';
          setTimeout(() => {
            if (item.getAttribute('data-category') !== filter && filter !== 'all') {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  // Inject gallery animations
  if (!document.getElementById('galleryStyle')) {
    const style = document.createElement('style');
    style.id = 'galleryStyle';
    style.textContent = `
      @keyframes galleryReveal {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes galleryHide {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.95); }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ═══════════════════════════════════════════
   RESERVATION FORM
═══════════════════════════════════════════ */
function initReservationForm() {
  const form = document.getElementById('reservationForm');
  const successMsg = document.getElementById('resSuccess');
  if (!form || !successMsg) return;

  // Set minimum date to today
  const dateInputs = form.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(input => {
    input.setAttribute('min', today);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather form data
    const data = new FormData(form);

    // Simulate API call with loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Confirming…';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      // Show success
      form.style.animation = 'formFadeOut 0.4s ease forwards';
      setTimeout(() => {
        form.style.display = 'none';
        successMsg.classList.add('show');
        successMsg.style.animation = 'formFadeIn 0.5s ease forwards';
      }, 400);
    }, 1500);
  });

  // Input animations
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const group = input.closest('.form-group');
    if (!group) return;

    input.addEventListener('focus', () => {
      group.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      group.classList.remove('focused');
    });
  });

  // Inject form animations
  if (!document.getElementById('formStyle')) {
    const style = document.createElement('style');
    style.id = 'formStyle';
    style.textContent = `
      @keyframes formFadeOut {
        to { opacity: 0; transform: translateY(-10px); }
      }
      @keyframes formFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .form-group.focused label { color: var(--gold); }
    `;
    document.head.appendChild(style);
  }
}

/* ═══════════════════════════════════════════
   TESTIMONIAL CAROUSEL
═══════════════════════════════════════════ */
function initTestimonialCarousel() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.t-dot');
  if (!track || !dots.length) return;

  let current = 0;
  const slides = track.querySelectorAll('.testimonial-slide');
  const total = slides.length;
  let autoplayTimer = null;

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      goTo(current + 1);
    }, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      goTo(i);
      startAutoplay();
    });
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
    startAutoplay();
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const carousel = document.querySelector('.testimonials');
    if (!carousel) return;
    const rect = carousel.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowLeft') { stopAutoplay(); goTo(current - 1); startAutoplay(); }
    if (e.key === 'ArrowRight') { stopAutoplay(); goTo(current + 1); startAutoplay(); }
  });

  startAutoplay();
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════ */
function addRevealClasses() {
  const targets = [
    '.about-text',
    '.about-visual',
    '.menu-category',
    '.event-card',
    '.pcard',
    '.contact-detail',
    '.private-feature',
    '.res-text',
    '.res-form-wrap',
    '.contact-form-wrap',
    '.contact-map',
    '.section-header',
    '.testimonial-carousel',
    '.marquee-section',
  ];

  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger sibling reveals
          const siblings = Array.from(
            entry.target.parentElement?.querySelectorAll('.reveal') || []
          );
          const idx = siblings.indexOf(entry.target);
          const delay = idx * 100;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  // Observe after a tick to allow addRevealClasses to run
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }, 100);
}

/* ═══════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#2d6a4f';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    }, 1200);
  });
});

/* ═══════════════════════════════════════════
   MENU ITEM HOVER GLOW
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item[data-hover]');
  menuItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      item.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,76,0.06) 0%, transparent 70%)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.background = '';
    });
  });
});

/* ═══════════════════════════════════════════
   GALLERY LIGHTBOX (simple)
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(7,7,9,0.95);
    z-index: 9000;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: none;
    backdrop-filter: blur(10px);
  `;

  const lightboxClose = document.createElement('button');
  lightboxClose.innerHTML = '&#10005;';
  lightboxClose.style.cssText = `
    position: absolute;
    top: 24px; right: 32px;
    font-size: 1.5rem;
    color: rgba(240,234,216,0.6);
    cursor: none;
    background: none;
    border: none;
    transition: color 0.3s;
    z-index: 1;
  `;
  lightboxClose.addEventListener('mouseenter', () => lightboxClose.style.color = '#c9a84c');
  lightboxClose.addEventListener('mouseleave', () => lightboxClose.style.color = 'rgba(240,234,216,0.6)');

  const lightboxContent = document.createElement('div');
  lightboxContent.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    text-align: center;
  `;

  const lightboxTitle = document.createElement('div');
  lightboxTitle.style.cssText = `
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-style: italic;
    color: #c9a84c;
    margin-top: 20px;
    letter-spacing: 0.1em;
  `;

  const lightboxPreview = document.createElement('div');
  lightboxPreview.style.cssText = `
    width: 70vw;
    height: 60vh;
    max-width: 900px;
    border-radius: 12px;
    border: 1px solid rgba(180,150,90,0.2);
    overflow: hidden;
  `;

  lightboxContent.appendChild(lightboxPreview);
  lightboxContent.appendChild(lightboxTitle);
  lightbox.appendChild(lightboxClose);
  lightbox.appendChild(lightboxContent);
  document.body.appendChild(lightbox);

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      const label = item.querySelector('.gallery-overlay span');

      // Clone the gallery image into lightbox
      const clone = img.cloneNode(true);
      clone.style.cssText = `
        width: 100%;
        height: 100%;
        min-height: unset;
        border-radius: 0;
      `;
      clone.querySelector('.gallery-overlay').remove();

      lightboxPreview.innerHTML = '';
      lightboxPreview.appendChild(clone);
      lightboxTitle.textContent = label ? label.textContent : '';

      lightbox.style.display = 'flex';
      lightbox.style.animation = 'lightboxIn 0.3s ease forwards';
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.style.animation = 'lightboxOut 0.3s ease forwards';
    setTimeout(() => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }, 280);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') closeLightbox();
  });

  // Lightbox animations
  if (!document.getElementById('lightboxStyle')) {
    const style = document.createElement('style');
    style.id = 'lightboxStyle';
    style.textContent = `
      @keyframes lightboxIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes lightboxOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
});

/* ═══════════════════════════════════════════
   ACTIVE NAV LINK on SCROLL
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'var(--gold)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
});

/* ═══════════════════════════════════════════
   SCROLL-TRIGGERED COUNTER
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const statNum = document.querySelector('.stat-number');
  if (!statNum) return;

  const target = 10;
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          let count = 0;
          const interval = setInterval(() => {
            count++;
            statNum.textContent = count + '+';
            if (count >= target) clearInterval(interval);
          }, 120);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statNum);
});

/* ═══════════════════════════════════════════
   PERFORMANCE: Reduce motion if preferred
═══════════════════════════════════════════ */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.orb, .flame, .scroll-line, .badge-inner').forEach(el => {
    el.style.animationPlayState = 'paused';
  });
  document.querySelectorAll('[style*="animation"]').forEach(el => {
    el.style.animationDuration = '0.01ms';
  });
}