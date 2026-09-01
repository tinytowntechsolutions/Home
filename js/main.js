/**
 * Tiny Town Tech Solutions - Interactive JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initEstimator();
  initShowcaseFilter();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   1. Navbar Scroll Effect & Active Section Spy
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

/* ==========================================================================
   3. Interactive Project & Care Estimator
   ========================================================================== */
function initEstimator() {
  const baseTypeInputs = document.querySelectorAll('input[name="project-type"]');
  const addonInputs = document.querySelectorAll('input[name="addons"]');
  const setupPriceEl = document.getElementById('est-setup-price');
  const monthlyPriceEl = document.getElementById('est-monthly-price');
  const recPlanEl = document.getElementById('est-recommended-plan');
  const breakdownListEl = document.getElementById('est-breakdown-list');

  if (!baseTypeInputs.length || !setupPriceEl) return;

  const pricingData = {
    'new-site': {
      name: 'Full Custom Website Build',
      setup: 899,
      monthly: 79,
      timeline: '10-14 Days',
      plan: 'All-in-One Growth Partner'
    },
    'redesign': {
      name: 'Modern Website Redesign',
      setup: 599,
      monthly: 79,
      timeline: '7-10 Days',
      plan: 'All-in-One Growth Partner'
    },
    'care-only': {
      name: 'Rescue, Hosting & Care Takeover',
      setup: 0,
      monthly: 69,
      timeline: '24-48 Hours',
      plan: 'Worry-Free Care Plan'
    },
    'landing': {
      name: 'Starter Single-Page Presence',
      setup: 399,
      monthly: 49,
      timeline: '3-5 Days',
      plan: 'Starter Launch'
    }
  };

  const addonData = {
    'ecommerce': { name: 'E-Commerce / Menu Ordering', setup: 249, monthly: 15 },
    'booking': { name: 'Online Appointment Scheduling', setup: 129, monthly: 0 },
    'branding': { name: 'Logo & Visual Brand Kit', setup: 179, monthly: 0 },
    'localseo': { name: 'Google Business Profile & Local SEO', setup: 149, monthly: 10 }
  };

  function updateEstimator() {
    let selectedType = 'new-site';
    baseTypeInputs.forEach(input => {
      if (input.checked) selectedType = input.value;
    });

    const base = pricingData[selectedType];
    let totalSetup = base.setup;
    let totalMonthly = base.monthly;
    let breakdown = [`${base.name} (Estimated: ${base.timeline})`];

    addonInputs.forEach(input => {
      if (input.checked && addonData[input.value]) {
        const item = addonData[input.value];
        totalSetup += item.setup;
        totalMonthly += item.monthly;
        breakdown.push(`+ ${item.name}`);
      }
    });

    // Add included perks
    breakdown.push('✓ High-Speed SSL Cloud Hosting Included');
    breakdown.push('✓ Unlimited Text & Photo Edits (24h turnaround)');
    breakdown.push('✓ Daily Security Backups & Uptime Monitoring');

    // Update DOM
    setupPriceEl.textContent = `$${totalSetup}`;
    monthlyPriceEl.textContent = `$${totalMonthly}/mo`;
    if (recPlanEl) {
      recPlanEl.textContent = base.plan;
    }

    if (breakdownListEl) {
      breakdownListEl.innerHTML = breakdown.map(item => `
        <li>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${item}</span>
        </li>
      `).join('');
    }
  }

  baseTypeInputs.forEach(input => input.addEventListener('change', updateEstimator));
  addonInputs.forEach(input => input.addEventListener('change', updateEstimator));
  
  // Initial trigger
  updateEstimator();
}

/* ==========================================================================
   4. Portfolio Showcase Category Filtering
   ========================================================================== */
function initShowcaseFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const showcaseCards = document.querySelectorAll('.showcase-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      showcaseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqCards = document.querySelectorAll('.faq-card');

  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');

      // Close other open cards for cleaner UX
      faqCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('open');
        }
      });

      if (isOpen) {
        card.classList.remove('open');
      } else {
        card.classList.add('open');
      }
    });
  });
}

/* ==========================================================================
   6. Contact / Free Audit Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  const statusBox = document.getElementById('form-status-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const business = document.getElementById('business').value.trim();
    const service = document.getElementById('service-interest').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email) {
      alert('Please provide your name and email address.');
      return;
    }

    // Friendly success UI feedback
    if (statusBox) {
      statusBox.style.display = 'flex';
      statusBox.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <div>
          <strong>Thank you, ${name}!</strong> We received your request. We'll review your details and get back to you within 24 business hours.
        </div>
      `;
    }

    // Optional mailto fallback trigger
    const mailtoLink = `mailto:tinytowntechsolutions@gmail.com?subject=Website%20Inquiry%20from%20${encodeURIComponent(business || name)}&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0ABusiness:%20${encodeURIComponent(business)}%0AService%20Interest:%20${encodeURIComponent(service)}%0AMessage:%20${encodeURIComponent(message)}`;
    
    console.log('Form submitted successfully:', { name, email, business, service, message, mailtoLink });
    form.reset();

    // Smooth scroll to status message if needed
    if (statusBox) {
      statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}
