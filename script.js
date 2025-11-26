/* script.js
  - Uses GSAP for polished animations.
  - Uses EmailJS for client-side email sends. (Replace placeholders)
*/

/* ====== GSAP animations (CDN included inside each HTML) ====== */
if (typeof gsap !== 'undefined') {
  // simple intro
  gsap.from(".logo", { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" });
  gsap.from(".h-title", { y: 18, opacity: 0, duration: 0.9, delay: 0.1, ease: "power3.out" });
  gsap.from(".h-sub", { y: 12, opacity: 0, duration: 0.9, delay: 0.2, ease: "power3.out" });
  gsap.from(".btn", { y: 10, opacity: 0, duration: 0.8, delay: 0.3, stagger: 0.08, ease: "power3.out" });

  // reveal content on scroll
  document.querySelectorAll('.section, .card, .member, .content, .hero-art, .card').forEach((el,i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 86%" },
      opacity: 0,
      y: 30,
      duration: 0.9,
      delay: i*0.03,
      ease: "power3.out"
    });
  });
}

/* ====== EmailJS form handling ======
  Setup:
    1. Go to https://www.emailjs.com/ and create an account.
    2. Add an email service (e.g. Gmail) and note the Service ID.
    3. Create an Email Template and note the Template ID. Use template fields: from_name, from_email, message, subject
    4. Copy your EmailJS User ID (public key).
    5. Replace the placeholders below.
*/
const EMAILJS_USER_ID = "YOUR_EMAILJS_USER_ID";       // e.g. "user_AbCdEf123"
const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID"; // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID"; // e.g. "template_xyz789"

// load emailjs SDK if configured
(function loadEmailJs(){
  if(!window.emailjs && EMAILJS_USER_ID !== "YOUR_EMAILJS_USER_ID"){
    const s = document.createElement('script');
    s.src = 'https://cdn.emailjs.com/sdk/3.2.0/email.min.js';
    s.onload = () => { emailjs.init(EMAILJS_USER_ID); console.log("EmailJS loaded"); };
    document.head.appendChild(s);
  }
})();

/* helper - formatted date like "2025-10-27 19:12" */
function formattedNow(){
  const d = new Date();
  const pad=(n)=>n.toString().padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* Generic form submit handler wired for forms: contactForm, joinForm */
function handleFormSubmit(formId, ctxName = "Contact"){
  const f = document.getElementById(formId);
  if(!f) return;
  f.addEventListener('submit', function(e){
    e.preventDefault();
    const name = (f.querySelector('[name="name"]') || {value:'Anonymous'}).value.trim();
    const email = (f.querySelector('[name="email"]') || {value:''}).value.trim();
    const message = (f.querySelector('[name="message"]') || {value:''}).value.trim();

    // Compose the subject exactly as requested:
    // CodeUnity: [Person’s Name]. [Date sent]
    const subject = `CodeUnity: ${name}. ${formattedNow()}`;

    // If EmailJS placeholders are not replaced, fallback to opening user's mail client (mailto)
    if(EMAILJS_USER_ID === "YOUR_EMAILJS_USER_ID"){
      // fallback: open mail client (not automatic send)
      const body = encodeURIComponent(message + "\n\n—\nFrom: " + name + " <" + email + ">");
      const mailto = `mailto:kapoor.lashika@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailto;
      return;
    }

    // Send with EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      subject: subject
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then((resp) => {
        console.log('Email sent', resp);
        alert("Thanks! Your message was sent.");
        f.reset();
      }, (err) => {
        console.error('Email error', err);
        alert("There was an error sending your message. Check console. As a fallback, your email client will open.");
        const body = encodeURIComponent(message + "\n\n—\nFrom: " + name + " <" + email + ">");
        window.location.href = `mailto:kapoor.lashika@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      });
  });
}

/* wire forms */
document.addEventListener('DOMContentLoaded', function(){
  handleFormSubmit('contactForm');
  handleFormSubmit('joinForm');
  handleFormSubmit('joinFormInline'); // in case another form id used
});
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    if (link.hostname === window.location.hostname && !link.target) {
      e.preventDefault();
      document.body.classList.remove("page-loaded");
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    }
  });
});

