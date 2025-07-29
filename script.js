// Menu toggle
const menuIcon = document.querySelector('.fa-bars');
const navList = document.querySelector('header nav ul');

menuIcon.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// Scroll active link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

function setActiveSection() {
  let scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === section.id) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Reveal on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach(sec => observer.observe(sec));

window.addEventListener("scroll", () => {
  setActiveSection();
});
