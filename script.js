/**
 * script.js
 * Luxury perfume link-in-bio — Particles + Entrance animations
 */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       1. GOLD FLOATING PARTICLES
       =============================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 45;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.8 + 0.4,
                speedY: -(Math.random() * 0.3 + 0.08),
                speedX: (Math.random() - 0.5) * 0.15,
                opacity: Math.random() * 0.35 + 0.05,
                fadeDir: Math.random() > 0.5 ? 1 : -1,
                fadeSpeed: Math.random() * 0.003 + 0.001
            };
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Drift
                p.y += p.speedY;
                p.x += p.speedX;

                // Twinkle
                p.opacity += p.fadeDir * p.fadeSpeed;
                if (p.opacity >= 0.4) { p.fadeDir = -1; }
                if (p.opacity <= 0.03) { p.fadeDir = 1; }

                // Reset if off screen
                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
                ctx.fill();

                // Soft glow halo on larger particles
                if (p.size > 1.2) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * 0.15})`;
                    ctx.fill();
                }
            });

            requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        initParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }


    /* ===============================
       2. STAGGERED ENTRANCE ANIMATIONS
       =============================== */
    const animElements = document.querySelectorAll('.anim-fade');

    // Use IntersectionObserver for scroll-triggered reveals
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseInt(el.dataset.delay || '0', 10);
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, delay);
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });

        animElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: just show everything
        animElements.forEach(el => el.classList.add('visible'));
    }


    /* ===============================
       3. SHIMMER ON BANNER TITLE
       =============================== */
    const bannerTitle = document.querySelector('.banner-title');
    if (bannerTitle) {
        // Activate shimmer after the fade-in completes
        setTimeout(() => {
            bannerTitle.classList.add('shimmer-active');
        }, 1200);
    }

});
