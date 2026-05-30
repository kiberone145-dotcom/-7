// --- Loading Screen closer ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 500);
});

// --- Custom Animated Cursor Handling ---
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Smooth lagging blur effect
    cursorBlur.style.left = e.clientX + 'px';
    cursorBlur.style.top = e.clientY + 'px';
});

// --- Typing Effect logic ---
const words = ["Web-разработку", "Vibe Coding", "AI-инжиниринг", "GameDev"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTarget = document.getElementById('typing');

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 1000));

// --- Parallax Effect on Hero Section ---
document.addEventListener('mousemove', (e) => {
    const target = document.querySelector('.parallax');
    if (!target) return;
    const speed = target.getAttribute('data-speed') || 2;
    const x = (window.innerWidth - e.clientX * speed) / 100;
    const y = (window.innerHeight - e.clientY * speed) / 100;
    
    target.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// --- Intersection Observer for On-Scroll Appear Animations ---
const observerOptions = {
    root: null,
    threshold: 0.15
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-show');
        }
    });
}, observerOptions);

document.querySelectorAll('.section-hidden').forEach(section => {
    sectionObserver.observe(section);
});

// --- Active Link Highlight on Scroll ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
