// Portfolio JavaScript - xdrew87.github.io
// Professional initialization with error handling

let effectInstances = {
    loadingScreen: null,
    glitchEffect: null,
    matrixEffect: null
};

// Wait for all scripts to load
function initializeEffects() {
    try {
        // Initialize loading screen
        if (window.LoadingScreen) {
            effectInstances.loadingScreen = new LoadingScreen();
            effectInstances.loadingScreen.init();
            console.log('✅ Loading screen initialized');
        }

        // Initialize glitch effect with delay
        setTimeout(() => {
            if (window.GlitchEffect) {
                effectInstances.glitchEffect = new GlitchEffect();
                effectInstances.glitchEffect.init();
                console.log('✅ Glitch effect initialized');
            }
        }, 200);

        // Initialize matrix effect with delay
        setTimeout(() => {
            if (window.MatrixEffect && document.getElementById('matrixCanvas')) {
                effectInstances.matrixEffect = new MatrixEffect();
                if (effectInstances.matrixEffect.init()) {
                    console.log('✅ Matrix effect initialized');
                }
            }
        }, 300);

    } catch (error) {
        console.error('❌ Error initializing effects:', error);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Give scripts time to load
    setTimeout(initializeEffects, 100);

    // Initialize all portfolio features
    initNetworkAnimation();
    initAnimations();
    initProjectFilter();
    initScrollEffects();
    initContactLinks();

    console.log('🚀 xdrew87 Portfolio Loaded - Cybersecurity Tools & Projects');
});

// Network Animation Canvas System - Enhanced
function initNetworkAnimation() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let frameCount = 0;
    const stats = { particles: 0, connections: 0 };

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Network particles with enhanced physics
    const particles = [];
    const particleCount = 55;
    const mouse = { x: null, y: null, radius: 220, vx: 0, vy: 0, lastX: 0, lastY: 0 };
    const settings = {
        connectionDistance: 180,
        particleRadius: 150,
        friction: 0.94,
        acceleration: 0.055,
        maxSpeed: 6
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2.5;
            this.vy = (Math.random() - 0.5) * 2.5;
            this.baseSize = Math.random() * 2.5 + 1;
            this.size = this.baseSize;
            const colors = ['#00d4ff', '#00ff88', '#00ccff', '#88ff00', '#0088ff', '#00ffcc'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.5;
            this.baseOpacity = this.opacity;
            this.trail = [];
            this.maxTrailLength = 7;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.connected = false;
            this.rotation = Math.random() * Math.PI * 2;
        }

        update() {
            // Apply velocity with friction
            this.vx *= settings.friction;
            this.vy *= settings.friction;

            // Enforce speed limit
            const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
            if (speed > settings.maxSpeed) {
                this.vx = (this.vx / speed) * settings.maxSpeed;
                this.vy = (this.vy / speed) * settings.maxSpeed;
            }

            // Update position
            this.x += this.vx;
            this.y += this.vy;

            // Softer wrapping at edges
            if (this.x < -20) this.x = canvas.width + 20;
            if (this.x > canvas.width + 20) this.x = -20;
            if (this.y < -20) this.y = canvas.height + 20;
            if (this.y > canvas.height + 20) this.y = -20;

            // Add light gravity toward center
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const dx = centerX - this.x;
            const dy = centerY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.max(canvas.width, canvas.height) * 0.65;

            if (distance > maxDistance) {
                this.vx += (dx / distance) * 0.12;
                this.vy += (dy / distance) * 0.12;
            }

            // Store trail for motion blur
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }

            // Pulse effect enhanced
            this.pulsePhase += 0.025;
            const pulse = Math.sin(this.pulsePhase) * 0.35 + 0.65;
            this.size = this.baseSize * pulse;
            this.opacity = this.baseOpacity * pulse;
            this.rotation += 0.03;
            this.connected = false;
        }

        drawTrail() {
            if (this.trail.length < 2) return;
            
            ctx.strokeStyle = this.color;
            for (let i = 0; i < this.trail.length - 1; i++) {
                ctx.globalAlpha = (i / this.trail.length) * 0.2;
                ctx.lineWidth = (this.trail.length - i) * 0.8;
                ctx.beginPath();
                ctx.moveTo(this.trail[i].x, this.trail[i].y);
                ctx.lineTo(this.trail[i + 1].x, this.trail[i + 1].y);
                ctx.stroke();
            }
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            
            // Extended glow effect
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(0.3, this.color.replace(')', ', 0.4)').replace('rgb', 'rgba'));
            gradient.addColorStop(1, this.color.replace(')', ', 0)').replace('rgb', 'rgba'));
            ctx.fillStyle = gradient;
            ctx.globalAlpha = this.opacity * 0.6;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Core with enhanced glow
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = 'transparent';
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    stats.particles = particles.length;

    // Enhanced line drawing with pulse
    function drawLine(from, to, distance, intensity = 1) {
        const dx = from.x - to.x;
        const dy = from.y - to.y;
        const distance2 = Math.sqrt(dx * dx + dy * dy);

        if (distance2 < distance) {
            const intensity2 = (1 - distance2 / distance) * intensity;
            
            // Color based on particle connection
            const lineColor = (from.color === to.color) ? from.color : '#00d4ff';
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = intensity2 * 0.4;
            ctx.lineWidth = 1.5 * intensity2;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
            
            // Pulse glow on strong connections
            if (intensity2 > 0.6) {
                ctx.strokeStyle = lineColor;
                ctx.globalAlpha = intensity2 * 0.2;
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            from.connected = true;
            to.connected = true;
        }
    }

    // Mouse position tracking with velocity
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const newX = e.clientX - rect.left;
        const newY = e.clientY - rect.top;
        
        mouse.vx = newX - mouse.x;
        mouse.vy = newY - mouse.y;
        mouse.x = newX;
        mouse.y = newY;
        mouse.lastX = newX;
        mouse.lastY = newY;

        // Particles attracted to mouse with vector force
        particles.forEach(particle => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (1 - distance / mouse.radius) * 0.8;
                particle.vx += (dx / distance) * force * settings.acceleration;
                particle.vy += (dy / distance) * force * settings.acceleration;
            }
        });
    });

    // Click interaction - create expansion wave
    canvas.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        particles.forEach(particle => {
            const dx = particle.x - clickX;
            const dy = particle.y - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 300) {
                const force = (1 - distance / 300) * 3;
                particle.vx += (dx / distance) * force;
                particle.vy += (dy / distance) * force;
            }
        });
    });

    // Touch support for mobile
    canvas.addEventListener('touchmove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const newX = touch.clientX - rect.left;
        const newY = touch.clientY - rect.top;
        
        mouse.x = newX;
        mouse.y = newY;

        particles.forEach(particle => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (1 - distance / mouse.radius) * 0.8;
                particle.vx += (dx / distance) * force * settings.acceleration;
                particle.vy += (dy / distance) * force * settings.acceleration;
            }
        });
    }, { passive: true });

    canvas.addEventListener('touchend', function() {
        mouse.x = null;
        mouse.y = null;
    });

    canvas.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });

    // Animation loop optimized
    function animate() {
        ctx.fillStyle = 'rgba(15, 15, 35, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        frameCount++;
        stats.connections = 0;

        // Draw trails first (background layer)
        particles.forEach(particle => {
            particle.drawTrail();
        });

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections with optimization
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = dx * dx + dy * dy;
                
                if (dist < settings.connectionDistance * settings.connectionDistance) {
                    drawLine(p1, p2, settings.connectionDistance);
                    stats.connections++;
                }
            }
        }

        // Draw mouse connections (optional pulse)
        if (mouse.x && mouse.y && frameCount % 2 === 0) {
            particles.forEach(particle => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    ctx.strokeStyle = '#00d4ff';
                    ctx.globalAlpha = (1 - distance / mouse.radius) * 0.3;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            });
        }

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// Animation system
function initAnimations() {
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        stat.style.opacity = '0';
        observer.observe(stat);
    });

    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.tool-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        cardObserver.observe(card);
    });
}

// Project filtering system
function initProjectFilter() {
    // Fetch GitHub repositories
    fetchGitHubProjects();

    // Set up filter button event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            // Get filter category
            const filter = this.dataset.filter;
            filterProjects(filter);
        });
    });

    // Smooth scroll to projects
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        filterButtons[0].addEventListener('focus', () => {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
}

// Filter project cards
function filterProjects(category) {
    const cards = document.querySelectorAll('.tool-card');
    let visibleCount = 0;

    cards.forEach((card, index) => {
        const cardCategory = card.dataset.category || 'all';
        let show = false;

        if (category === 'all') {
            show = true;
        } else if (category === 'security') {
            show = cardCategory === 'security';
        } else if (category === 'network') {
            show = cardCategory === 'network';
        } else if (category === 'analysis') {
            show = cardCategory === 'analysis';
        }

        if (show) {
            card.style.display = '';
            card.style.animation = `fadeInUp 0.6s ease-out ${(index % 12) * 0.05}s both`;
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Announce filter result to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Showing ${visibleCount} project${visibleCount !== 1 ? 's' : ''}`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// Fetch GitHub public repositories
async function fetchGitHubProjects() {
    const username = 'xdrew87';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=stars&per_page=50&type=public`;

    try {
        console.log('📡 Fetching GitHub repositories...');
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();
        const toolsGrid = document.querySelector('.tools-grid');

        // Clear existing placeholder projects
        toolsGrid.innerHTML = '';

        // Map repository topics to categories with expanded keywords
        const categoryMap = {
            'security': [
                'security', 'cryptography', 'encryption', 'forensics', 'crypto', 
                'breach', 'vulnerability', 'vuln', 'scanner', 'scan', 'siem',
                'malware', 'threat', 'exploit', 'hack', 'penetration', 'pentest'
            ],
            'network': [
                'network', 'vpn', 'sniffing', 'sniffer', 'osint', 'networking',
                'port', 'ip', 'dns', 'tcp', 'udp', 'packet', 'protocol',
                'sentinel', 'netsentinel', 'netsniff'
            ],
            'analysis': [
                'analysis', 'analyzer', 'intelligence', 'intel', 'aggregate',
                'aggregation', 'data', 'monitor', 'monitoring', 'watch', 'watchdog',
                'lens', 'research', 'reconnaissance', 'recon'
            ]
        };

        // Add GitHub repositories as project cards
        repos.forEach((repo, index) => {
            // Skip archived or empty repos
            if (repo.archived) return;

            const languages = repo.language ? repo.language.toLowerCase() : '';
            const description = repo.description || 'A cybersecurity project';
            const topics = repo.topics || [];
            const repoName = repo.name.toLowerCase();

            // Determine category based on name, description, and topics
            let category = 'all';
            for (const [cat, keywords] of Object.entries(categoryMap)) {
                if (
                    keywords.some(kw => 
                        repoName.includes(kw) ||
                        description.toLowerCase().includes(kw) || 
                        topics.some(t => t.toLowerCase().includes(kw))
                    )
                ) {
                    category = cat;
                    break;
                }
            }

            // Create project card
            const card = document.createElement('div');
            card.className = `tool-card${index < 4 ? ' featured' : ''}`;
            card.dataset.category = category;
            card.dataset.languages = languages;
            card.style.animation = 'slideInUp 0.6s ease-out forwards';
            card.style.opacity = '0';
            card.style.animationDelay = `${index * 0.1}s`;

            const tagsHTML = topics.slice(0, 3).map(topic => 
                `<span class="tag">${topic}</span>`
            ).join('') + (languages ? `<span class="tag">${languages}</span>` : '');

            card.innerHTML = `
                <div class="card-header">
                    <h3>📦 ${repo.name}</h3>
                    <span class="stars">⭐ ${repo.stargazers_count}</span>
                </div>
                <p class="description">${description}</p>
                <div class="tags">
                    ${tagsHTML}
                </div>
                <div class="card-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                        View on GitHub →
                    </a>
                </div>
            `;

            toolsGrid.appendChild(card);
        });

        // Update project count
        const projectCount = repos.filter(r => !r.archived).length;
        const statNumber = document.querySelector('.stat-number');
        if (statNumber) {
            statNumber.textContent = projectCount;
        }

        console.log(`✅ Loaded ${projectCount} public repositories from GitHub`);
    } catch (error) {
        console.error('❌ Error fetching GitHub projects:', error);
        // Keep placeholder projects if API fails
    }
}

// Scroll effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Hide/show nav on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;

        // Parallax effect for header
        const header = document.querySelector('header');
        if (header) {
            const scrolled = scrollTop * 0.5;
            header.style.backgroundPosition = `center ${scrolled}px`;
        }
    });
}

// Enhanced contact links
function initContactLinks() {
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Track GitHub link clicks
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('🔗 GitHub link clicked:', this.href);

            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some CSS animations
const additionalStyles = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .tool-card {
        transition: all 0.3s ease;
    }

    .tool-card:hover {
        box-shadow: 0 15px 30px rgba(0, 212, 255, 0.3);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Portfolio loaded in ${loadTime.toFixed(2)}ms`);

    // Add loading complete indicator
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
});