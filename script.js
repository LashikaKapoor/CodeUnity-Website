// GSAP fade-in animations
gsap.utils.toArray('.fadeIn').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });
});

// Forms handling (EmailJS/Formspree integration needed)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submission requires backend setup.');
    contactForm.reset();
  });
}

const joinForm = document.getElementById('joinForm');
if(joinForm){
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submission requires backend setup.');
    joinForm.reset();
  });
}
