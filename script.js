// Create animated background particles
function createParticles() {
    const background = document.getElementById('backgroundAnimation');
    const particleCount = 48;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 8 and 20 pixels
        const size = Math.random() * 12 + 8;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random starting position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 8 + 12}s`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        
        background.appendChild(particle);
    }
}

// Smooth scroll to section on nav-tab click
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Download simulation
function startDownload(platform, event) {
    if (event) event.preventDefault();
    const progressBar = document.getElementById(`${platform}Progress`);
    const progressFill = progressBar.querySelector('.loading-progress');
    progressBar.style.display = 'block';
    progressFill.style.width = '0%';
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 12 + 4;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                progressBar.style.display = 'none';
                progressFill.style.width = '0%';
                if (platform === 'windows') {
                    // Show burst animation overlay
                    showDownloadStrengthOverlay();
                    setTimeout(() => {
                        hideDownloadStrengthOverlay();
                        window.open('https://www.dropbox.com/scl/fi/m6a033za7l6r2tr5aquz7/BL_Installer-1.02.exe?rlkey=ke9bgnus12qp3jz2aessu1jwr&st=hqgs8f9k&dl=1', '_blank');
                    }, 2000);
                }
            }, 600);
        }
        progressFill.style.width = `${progress}%`;
    }, 180);
}

// Download strength overlay logic
function showDownloadStrengthOverlay() {
    let overlay = document.querySelector('.download-strength-overlay');
    if (overlay) overlay.remove();
    overlay = document.createElement('div');
    overlay.className = 'download-strength-overlay';
    // Multiple auras
    for (let i = 0; i < 3; i++) {
        const aura = document.createElement('div');
        aura.className = 'aura';
        aura.style.animationDelay = `${i * 0.18}s`;
        overlay.appendChild(aura);
    }
    // Many particles
    for (let i = 0; i < 36; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const angle = (i / 36) * 2 * Math.PI;
        const radius = 320 + Math.random() * 120;
        const tx = Math.cos(angle) * radius;
        const ty = Math.sin(angle) * radius;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.animationDelay = `${Math.random() * 0.3}s`;
        overlay.appendChild(particle);
    }
    // Text
    const text = document.createElement('span');
    text.className = 'download-strength-text';
    text.textContent = 'Consistency Matters Most';
    overlay.appendChild(text);
    document.body.appendChild(overlay);
    overlay.classList.add('active');
}
function hideDownloadStrengthOverlay() {
    const overlay = document.querySelector('.download-strength-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => { if (overlay) overlay.remove(); }, 1200);
    }
}

// Custom animated cursor and mouse trail
const cursor = document.createElement('div');
cursor.className = 'animated-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    // Mouse trail effect
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = `${e.clientX - 9}px`;
    trail.style.top = `${e.clientY - 9}px`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 700);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform += ' scale(0.8)';
    cursor.style.background = 'rgba(255,215,0,0.18)';
});
document.addEventListener('mouseup', () => {
    cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '');
    cursor.style.background = 'rgba(255,255,255,0.08)';
});

// Animate text on load
function animateText() {
    document.querySelectorAll('h1, .section-title, .section-subtitle, .tagline').forEach((el, i) => {
        el.style.opacity = 0;
        el.style.filter = 'blur(8px)';
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.filter = 'blur(0)';
        }, 200 + i * 180);
    });
}

// Enhanced scroll-triggered animation for all .scroll-animate elements (sections and cards)
function handleScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.13 });
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateText();
    handleScrollAnimations();
    // Animate all cards on load
    document.querySelectorAll('.download-card, .feature-card, .requirement-card, .contact-card').forEach((card, i) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(40px) scale(0.98)';
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0) scale(1)';
        }, 200 + i * 120);
    });
});