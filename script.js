// Dark/Light Mode Toggle
const toggleBtn = document.querySelector('.toggle-btn');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Fade-in animations for cards
function showCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => card.classList.add('show'), index * 200);
    });
}

window.addEventListener('load', showCards);
