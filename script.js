// Animazioni al caricamento della pagina

document.addEventListener('DOMContentLoaded', function() {

    // 1. Animazione on scroll per gli elementi

    initScrollAnimations();

    

    // 2. Scroll smooth per i link interni

    initSmoothScroll();

    

    // 3. Effetti hover per le carte

    initHoverEffects();

    

    // 4. Effetto parallax

    initParallax();

    

    // 5. Effetti click sui bottoni

    initButtonEffects();

    

    // 6. Animazione processi

    initProcessAnimations();

    

    // 7. Effetto digitazione per il tagline

    initTypeWriter();

});

// 1. Animazione on scroll

function initScrollAnimations() {

    const observerOptions = {

        threshold: 0.1,

        rootMargin: '0px 0px -50px 0px'

    };

    

    const observer = new IntersectionObserver(function(entries) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

                

                // Delay progressivo per gli elementi della stessa sezione

                if (entry.target.classList.contains('process-step') || 

                    entry.target.classList.contains('service-card') ||

                    entry.target.classList.contains('why-card')) {

                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);

                    entry.target.style.transitionDelay = `${index * 0.1}s`;

                }

            }

        });

    }, observerOptions);

    

    // Osserva tutti gli elementi con classe animate-up

    document.querySelectorAll('.animate-up').forEach(el => {

        observer.observe(el);

    });

}

// 2. Scroll smooth

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function(e) {

            e.preventDefault();

            const targetId = this.getAttribute('href');

            if(targetId === '#') return;

            

            const targetElement = document.querySelector(targetId);

            if(targetElement) {

                window.scrollTo({

                    top: targetElement.offsetTop - 80,

                    behavior: 'smooth'

                });

            }

        });

    });

}

// 3. Effetti hover

function initHoverEffects() {

    const cards = document.querySelectorAll('.service-card, .why-card, .platform, .contact-item');

    

    cards.forEach(card => {

        card.addEventListener('mouseenter', function() {

            this.style.transform = 'translateY(-10px)';

            this.style.boxShadow = '0 15px 30px rgba(0, 255, 136, 0.15)';

        });

        

        card.addEventListener('mouseleave', function() {

            this.style.transform = 'translateY(0)';

            this.style.boxShadow = '';

        });

    });

}

// 4. Effetto parallax

function initParallax() {

    window.addEventListener('scroll', function() {

        const scrollPosition = window.scrollY;

        const header = document.querySelector('header');

        

        if(header && scrollPosition < window.innerHeight) {

            header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;

            

            // Effetto fade sul logo

            const logo = document.querySelector('.logo');

            if(logo) {

                const opacity = 1 - (scrollPosition / 500);

                logo.style.opacity = Math.max(opacity, 0.3);

            }

        }

        

        // Effetto sui LED

        const ledBorders = document.querySelectorAll('.led-border');

        ledBorders.forEach(border => {

            const intensity = 0.5 + (Math.sin(scrollPosition / 200) * 0.3);

            border.style.opacity = intensity;

        });

    });

}

// 5. Effetti click sui bottoni

function initButtonEffects() {

    const buttons = document.querySelectorAll('.cta-button');

    

    buttons.forEach(button => {

        button.addEventListener('click', function(e) {

            // Effetto ripple

            const ripple = document.createElement('span');

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            const x = e.clientX - rect.left - size / 2;

            const y = e.clientY - rect.top - size / 2;

            

            ripple.style.cssText = `

                position: absolute;

                border-radius: 50%;

                background: rgba(255, 255, 255, 0.6);

                transform: scale(0);

                animation: ripple 0.6s linear;

                width: ${size}px;

                height: ${size}px;

                top: ${y}px;

                left: ${x}px;

                pointer-events: none;

            `;

            

            this.appendChild(ripple);

            

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    

    // Aggiungi stile per ripple

    const style = document.createElement('style');

    style.textContent = `

        @keyframes ripple {

            to {

                transform: scale(4);

                opacity: 0;

            }

        }

    `;

    document.head.appendChild(style);

}

// 6. Animazione processi

function initProcessAnimations() {

    const processNumbers = document.querySelectorAll('.step-number');

    

    processNumbers.forEach(number => {

        number.addEventListener('mouseenter', function() {

            this.style.transform = 'scale(1.1)';

            this.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';

        });

        

        number.addEventListener('mouseleave', function() {

            this.style.transform = 'scale(1)';

            this.style.boxShadow = 'none';

        });

    });

}

// 7. Effetto digitazione

function initTypeWriter() {

    const tagline = document.querySelector('.tagline');

    if (!tagline) return;

    

    const originalText = tagline.textContent;

    tagline.textContent = '';

    tagline.style.opacity = '1';

    

    let i = 0;

    const speed = 40;

    

    function typeWriter() {

        if (i < originalText.length) {

            tagline.textContent += originalText.charAt(i);

            

            // Cursore

            if (i === originalText.length - 1) {

                tagline.style.borderRight = 'none';

            } else {

                tagline.style.borderRight = '2px solid var(--primary-color)';

                tagline.style.paddingRight = '2px';

            }

            

            i++;

            setTimeout(typeWriter, speed);

        } else {

            tagline.style.borderRight = 'none';

        }

    }

    

    // Inizia dopo un breve ritardo

    setTimeout(typeWriter, 1000);

}

// Animazione per