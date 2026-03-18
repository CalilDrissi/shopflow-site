/* ShopFlow Marketing Site — GSAP 3.12.5 Powered */

// --- Register ScrollTrigger ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Scroll-triggered nav background ---
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// --- Mobile nav toggle ---
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const open = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// --- Active nav link ---
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// --- GSAP Animations ---
if (typeof gsap !== 'undefined') {

  // Set initial state for reveals
  gsap.set('.reveal', { y: 40, opacity: 0 });

  // --- Hero Timeline ---
  const heroLabel = document.querySelector('.hero .section-label');
  const heroH1 = document.querySelector('.hero h1');
  const heroP = document.querySelector('.hero p');
  const heroButtons = document.querySelectorAll('.hero-buttons .btn');
  const heroPreview = document.querySelector('.hero-preview');
  const heroMesh = document.querySelector('.hero-mesh');

  if (heroH1) {
    const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (heroLabel) {
      heroTL.from(heroLabel, { y: 20, opacity: 0, duration: 0.6 });
    }
    heroTL.from(heroH1, { y: 30, opacity: 0, duration: 0.8 }, heroLabel ? '-=0.3' : 0);
    if (heroP) {
      heroTL.from(heroP, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');
    }
    if (heroButtons.length) {
      heroTL.from(heroButtons, { y: 15, opacity: 0, duration: 0.5, stagger: 0.15 }, '-=0.3');
    }
    if (heroPreview) {
      // Override the reveal set for hero-preview since it's in the timeline
      gsap.set(heroPreview, { y: 60, opacity: 0, rotateX: 8, transformPerspective: 800 });
      heroTL.to(heroPreview, { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power2.out' }, '-=0.2');
    }
    if (heroMesh) {
      gsap.set(heroMesh, { scale: 0.6, opacity: 0 });
      heroTL.to(heroMesh, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.3);
    }
  }

  // --- Hero Mesh Float ---
  if (heroMesh) {
    gsap.to(heroMesh, {
      y: 20,
      x: 10,
      duration: 6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  // --- Counter Animation (GSAP) ---
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    // Override reveal state for stats bar since we handle it via ScrollTrigger
    const statEls = document.querySelectorAll('.stat-value[data-count]');

    ScrollTrigger.create({
      trigger: statsBar,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        // Animate the stats bar in
        gsap.to(statsBar, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });

        statEls.forEach(el => {
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
            }
          });
        });
      }
    });
  }

  // --- Scroll Reveals (batch) ---
  ScrollTrigger.batch('.reveal', {
    start: 'top 85%',
    onEnter: (batch) => {
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12
      });
    },
    once: true
  });

  // --- Integration Logos Stagger ---
  const integrationLogos = document.querySelectorAll('.integration-logo');
  if (integrationLogos.length) {
    gsap.set(integrationLogos, { y: 20, opacity: 0 });
    ScrollTrigger.create({
      trigger: '.integration-logos',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(integrationLogos, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out'
        });
      }
    });
  }

  // --- Feature Rows: Slide text from left, visual from right ---
  document.querySelectorAll('.feature-row').forEach(row => {
    const isReverse = row.classList.contains('reverse');
    const text = row.querySelector('.feature-text');
    const visual = row.querySelector('.feature-visual');

    if (text && visual) {
      gsap.set(text, { x: isReverse ? 40 : -40, opacity: 0 });
      gsap.set(visual, { x: isReverse ? -40 : 40, opacity: 0 });

      ScrollTrigger.create({
        trigger: row,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(text, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });
          gsap.to(visual, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.15 });
        }
      });
    }
  });

  // --- Testimonial Cards Stagger ---
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length) {
    gsap.set(testimonialCards, { y: 30, opacity: 0 });
    ScrollTrigger.create({
      trigger: '.testimonial-grid',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(testimonialCards, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out'
        });
      }
    });
  }

  // --- CTA Glow Parallax ---
  const ctaGlow = document.querySelector('.cta-glow');
  if (ctaGlow) {
    gsap.to(ctaGlow, {
      y: -80,
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  // --- Pricing Cards Stagger ---
  const pricingCards = document.querySelectorAll('.pricing-card');
  if (pricingCards.length) {
    gsap.set(pricingCards, { y: 30, opacity: 0 });
    ScrollTrigger.batch('.pricing-card', {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out'
        });
      },
      once: true
    });
  }

  // --- Timeline Items ---
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    gsap.set(timelineItems, { x: -30, opacity: 0 });
    ScrollTrigger.batch('.timeline-item', {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.to(batch, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out'
        });
      },
      once: true
    });
  }

} // end GSAP check

// --- Template filtering (GSAP-powered) ---
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const allCards = document.querySelectorAll('.template-card');
      const visibleCards = [];

      allCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
          visibleCards.push(card);
        } else {
          card.style.display = 'none';
        }
      });

      // Animate visible cards with GSAP
      if (typeof gsap !== 'undefined' && visibleCards.length) {
        gsap.from(visibleCards, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        });
      }
    });
  });
}
