const navList = document.querySelector('header nav ul');
const hamburger = document.querySelector('.ham');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const footer = document.querySelector('footer');
const certificatesWrapper = document.querySelector('.certificates-wrapper');
const certificates = document.querySelector('.certificates');
const contactForm = document.getElementById('contact-form');
const backToTopBtn = document.getElementById('back-to-top');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navList.classList.toggle('show');
});

// Function to remove active class from all nav links
function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove('active'));
}

// Infinite scroll for certificates
function setupInfiniteScroll() {
    if (!certificatesWrapper || !certificates) return;

    const certItems = certificates.querySelectorAll('.certificate-item');
    certItems.forEach(item => {
        const clone = item.cloneNode(true);
        certificates.appendChild(clone);
    });

    certificatesWrapper.addEventListener('scroll', () => {
        const maxScroll = certificates.scrollWidth / 2;
        if (certificatesWrapper.scrollLeft >= maxScroll) {
            certificatesWrapper.scrollLeft -= maxScroll;
        } else if (certificatesWrapper.scrollLeft <= 0) {
            certificatesWrapper.scrollLeft += maxScroll;
        }
    });
}

// Handle form submission with EmailJS
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        phone: contactForm.phone.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value
    };

    emailjs.send('service_ki4jowg', 'template_ngo1q8u', formData)
        .then(function(response) {
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset(); // Clear the form
        }, function(error) {
            alert('Failed to send message. Please try again later. Error: ' + error.text);
        });
});

// Trigger animations for a given element
function triggerAnimations(element) {
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.opacity = '1';

    if (element.id === 'home') {
        const content = element.querySelector('.content');
        const profileImg = element.querySelector('.profile img');
        content.style.animation = 'none';
        profileImg.style.animation = 'none';
        content.offsetHeight;
        profileImg.offsetHeight;
        content.style.opacity = '0';
        profileImg.style.opacity = '0';
        content.style.animation = 'slideInLeft 0.8s ease-in forwards';
        profileImg.style.animation = 'slideInRight 0.8s ease-in forwards, float 3s ease-in-out infinite';
    } else if (element.id === 'about') {
        element.style.animation = 'fadeIn 0.8s ease-in forwards';
        const aboutP = element.querySelector('p');
        aboutP.style.animation = 'none';
        aboutP.offsetHeight;
        aboutP.style.opacity = '0';
        aboutP.style.animation = 'slideInUp 0.8s ease-in 0.2s forwards';
    } else if (element.id === 'skills') {
        element.style.animation = 'fadeIn 0.8s ease-in forwards';
        const skillCards = element.querySelectorAll('.skill-cards div');
        skillCards.forEach((card, index) => {
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.opacity = '0';
            card.style.animation = `slideInUp 0.8s ease-in ${0.1 * (index + 1)}s forwards`;
        });
    } else if (element.id === 'certificates') {
        element.style.animation = 'fadeIn 0.8s ease-in forwards';
        const certs = element.querySelectorAll('.certificate-item');
        certs.forEach((cert, index) => {
            cert.style.animation = 'none';
            cert.offsetHeight;
            cert.style.opacity = '0';
            cert.style.animation = `slideInRight 0.8s ease-in ${0.1 * (index % 4 + 1)}s forwards`;
        });
    } else if (element.id === 'contact') {
        element.style.animation = 'fadeIn 0.8s ease-in forwards';
        const inputs = element.querySelectorAll('input, textarea, button');
        inputs.forEach((input, index) => {
            input.style.animation = 'none';
            input.offsetHeight;
            input.style.opacity = '0';
            input.style.animation = `slideInUp 0.8s ease-in ${0.1 * (index + 1)}s forwards`;
        });
    } else if (element.tagName.toLowerCase() === 'footer') {
        const footerP = element.querySelector('p');
        footerP.style.animation = 'none';
        footerP.offsetHeight;
        footerP.style.opacity = '0';
        footerP.style.animation = 'fadeIn 0.8s ease-in forwards';
    }
}

// Intersection Observer for section and footer animations, and back-to-top button
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            triggerAnimations(element);
            if (element.id) {
                removeActiveClasses();
                const activeLink = document.querySelector(`a[href="#${element.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
            if (element.id === 'about') {
                backToTopBtn.classList.add('visible');
            } else if (element.id === 'home') {
                backToTopBtn.classList.remove('visible');
            }
        } else if (element.id !== 'home') {
            element.style.opacity = '0';
            if (element.id !== 'about') {
                backToTopBtn.classList.remove('visible');
            }
        }
    });
}, {
    threshold: 0.01,
    rootMargin: '0px'
});

// Observe all sections and footer
sections.forEach(section => {
    observer.observe(section);
});
observer.observe(footer);

// Initial animation for the section in view on page load
document.addEventListener('DOMContentLoaded', () => {
    setupInfiniteScroll();
    const hash = window.location.hash.replace('#', '');
    const initialSection = hash ? document.querySelector(`#${hash}`) : document.querySelector('#home');
    
    if (initialSection) {
        initialSection.style.opacity = '1';
        triggerAnimations(initialSection);
        removeActiveClasses();
        const activeLink = document.querySelector(`a[href="#${initialSection.id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        if (initialSection.id === 'home') {
            backToTopBtn.classList.remove('visible');
        }
    }
});

// Update active nav link on click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        removeActiveClasses();
        link.classList.add('active');
        navList.classList.remove('show');
    });
});

// Back to top button click event
backToTopBtn.addEventListener('click', () => {
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
});

// Fallback to ensure visibility if animations fail
window.addEventListener('load', () => {
    sections.forEach(section => {
        if (getComputedStyle(section).opacity === '0') {
            section.style.opacity = '1';
            section.querySelectorAll('.content, .profile img, p, .skill-cards div, .certificate-item, input, textarea, button').forEach(el => {
                el.style.opacity = '1';
                el.style.animation = 'none';
            });
        }
    });
    const footerP = footer.querySelector('p');
    if (getComputedStyle(footerP).opacity === '0') {
        footerP.style.opacity = '1';
        footerP.style.animation = 'none';
    }
});
