/**
 * Tiny Town Tech Solutions - JavaScript Logic
 * Simple Flat $400/mo Plan
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
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

    let current = '';
    const scrollPosition = window.pageYOffset + 140;

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
   3. Interactive FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqCards = document.querySelectorAll('.faq-card');

  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');

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
   4. Contact / Get Started Intake Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('signup-form');
  const statusBox = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const businessInput = document.getElementById('business');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const business = businessInput.value.trim();
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !business) {
      alert('Please fill out all required fields (Name, Email, and Business Name).');
      return;
    }

    // Set loading state on button
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Sending Request...</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
    `;

    try {
      const response = await fetch('https://formsubmit.co/ajax/tinytowntechsolutions@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Business: business,
          Phone: phone || 'Not provided',
          Message: message || 'Standard 5-page signup',
          _subject: `New $400/mo Website Client: ${business} (${name})`,
          _template: 'table'
        })
      });

      const result = await response.json();

      if (response.ok || result.success === "true" || result.success === true) {
        statusBox.className = 'form-status success';
        statusBox.style.display = 'flex';
        statusBox.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div>
            <strong>Thank you, ${name}!</strong> Your request has been sent to <strong>tinytowntechsolutions@gmail.com</strong>. We will review your details and reach out within 24 hours to kick off your 5-page website build!
          </div>
        `;
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('AJAX submission encountered error, falling back to standard submit:', err);
      // Fallback: submit standard form directly to ensure email is never lost
      form.submit();
      return;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      if (statusBox.style.display === 'flex') {
        statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  });
}

