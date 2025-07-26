// Select navigation icons and sections
const navItems = document.querySelectorAll('.nav-list li');
const sections = document.querySelectorAll('.section');
const testimonialCards = document.querySelectorAll('.testimonial-card');

// Scroll to section when nav icon is clicked
navItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    sections[index].scrollIntoView({ behavior: 'smooth' });

    // Update active icon
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Scroll arrow logic
function scrollToNextSection() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const currentIndex = Math.floor(scrollY / viewportHeight);
  const nextSection = sections[currentIndex + 1];
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Auto-update active icon when scrolling manually
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  const viewportHeight = window.innerHeight;

  sections.forEach((section, index) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos + viewportHeight / 2 >= top && scrollPos + viewportHeight / 2 < bottom) {
      navItems.forEach(i => i.classList.remove('active'));
      if (navItems[index]) navItems[index].classList.add('active');
    }
  });
});

function revealTestimonials() {
  const triggerBottom = window.innerHeight * 0.85;

  testimonialCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealTestimonials);

