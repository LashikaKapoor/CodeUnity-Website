// ===== Dark / Light Mode =====
const toggleBtn = document.querySelector('.toggle-btn');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('mode', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved mode
if(localStorage.getItem('mode') === 'dark') {
  document.body.classList.add('dark');
}

// ===== Scroll Animations =====
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

// ===== Smooth Scroll for nav links =====
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if(this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ===== Hover Glowing Buttons =====
const buttons = document.querySelectorAll('.btn, .toggle-btn');

buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.07)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
});
