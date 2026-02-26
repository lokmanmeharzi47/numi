// محرك النجوم الضخمة المتلألئة
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: -2000, y: -2000 };

window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('touchstart', (e) => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; });

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 32; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 6 + 4, // نجوم ضخمة
            speed: Math.random() * 0.15 + 0.1,
            velX: (Math.random() - 0.5) * 0.2,
            opacity: Math.random(),
            twinkle: Math.random() * 0.012
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
        p.y -= p.speed; p.x += p.velX;
        let dx = mouse.x - p.x; let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) { p.x -= dx / 40; p.y -= dy / 40; }
        p.opacity += p.twinkle;
        if (p.opacity > 0.9 || p.opacity < 0.2) p.twinkle *= -1;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.save();
        ctx.shadowBlur = 30; ctx.shadowColor = "rgba(212, 175, 55, 0.8)";
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.abs(p.opacity)})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();

        // قلب النجمة الساطع
        ctx.fillStyle = `rgba(255, 245, 220, ${p.opacity + 0.1})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    });
    requestAnimationFrame(draw);
}

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('loader-hidden');
        document.getElementById('heroImg').classList.add('loaded');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.anim-reveal').forEach(el => observer.observe(el));
    }, 1200);
});

initCanvas(); draw();
window.addEventListener('resize', initCanvas);
