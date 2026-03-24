document.addEventListener('DOMContentLoaded', () => {

    const titles = ["Frontend Developer", "UI/UX Enthusiast", "Creative Coder"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedElement = document.getElementById('typed-text');
    
    function typeEffect() {
        const currentTitle = titles[titleIndex];
        if (isDeleting) {
            typedElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeEffect, 300);
            return;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    typeEffect();
    
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-slide');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    animatedElements.forEach(el => scrollObserver.observe(el));
    
    document.querySelectorAll('.about-card, .skill-card, .project-card, .timeline-item, .contact-info, .contact-form, .hero-content').forEach(el => {
        if (!el.classList.contains('fade-up') && !el.classList.contains('fade-left') && !el.classList.contains('fade-right')) {
            el.classList.add('fade-slide');
            scrollObserver.observe(el);
        }
    });
    
    const skillBars = document.querySelectorAll('.level-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.transition = 'width 1s ease';
                bar.style.width = width;
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
    
    const contactForm = document.getElementById('contactForm');
    const feedbackDiv = document.getElementById('formFeedback');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name && email && message) {
            feedbackDiv.innerHTML = '<span style="color: #6366F1;">✓ Message sent successfully! Abeer will respond soon.</span>';
            contactForm.reset();
            setTimeout(() => {
                feedbackDiv.innerHTML = '';
            }, 4000);
        } else {
            feedbackDiv.innerHTML = '<span style="color: #F472B6;">Please fill in all fields.</span>';
        }
    });
    

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: #F472B6;
        }
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Portfolio ready — Abeer Hafedh | Frontend Developer');
});