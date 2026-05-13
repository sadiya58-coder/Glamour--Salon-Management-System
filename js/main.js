// ===========================
// GLAMOUR SALON – MAIN JS
// ===========================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks) navLinks.classList.remove('open');
  });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-slide-left, .animate-slide-right, .service-card, .rating-card, .value-card, .team-card, .service-full-card, .service-detail-item, .contact-info-item').forEach(el => {
  observer.observe(el);
});

// Stagger animation for grids
document.querySelectorAll('.services-grid .service-card, .ratings-grid .rating-card, .values-grid .value-card, .team-grid .team-card, .services-full-grid .service-full-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Set min date for booking
const dateInput = document.getElementById('appointmentDate');
if (dateInput) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split('T')[0];
}

// Add in-view class for animated cards
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) translateX(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .rating-card, .value-card, .team-card, .service-full-card, .service-detail-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.35s ease';
  cardObserver.observe(el);
});
