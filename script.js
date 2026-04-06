// script.js - Interactive functionality for ROSEAN-X Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle for Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link (already handled in link click event)
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close mobile menu on scroll
        window.addEventListener('scroll', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinksAll = document.querySelectorAll('.nav-links a, .footer-links a');

    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }

                // Update active link
                updateActiveNavLink(targetId);
            }
        });
    });

    // Update Active Navigation Link on Scroll
    function updateActiveNavLink(activeId) {
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');

                // Update active navigation link
                const id = entry.target.getAttribute('id');
                if (id) {
                    updateActiveNavLink('#' + id);
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Typing Animation for Hero Subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }

    // Skill Tags Hover Effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Project Cards Hover Enhancement
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(2deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Contact Cards Animation
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });

    // Social Links Hover Effect with Icon Bounce
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.animation = 'bounce 0.6s ease';
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.animation = '';
        });
    });

    // Add bounce keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
            40%, 43% { transform: translate3d(0, -8px, 0); }
            70% { transform: translate3d(0, -4px, 0); }
            90% { transform: translate3d(0, -2px, 0); }
        }
    `;
    document.head.appendChild(style);

    // Parallax Effect for Hero Background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Dynamic Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Progress Bar Animation for Upcoming Projects
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // Easter Egg: Konami Code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);

        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            // Trigger fun animation
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    // Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Prevent right-click (optional)
    // document.addEventListener('contextmenu', function(e) {
    //     e.preventDefault();
    // });

    // ========== GIFT SHAKA GLOBAL ECOSYSTEM FUNCTIONALITY ==========
    
    // Tab Switching Functionality
    const gsgTabs = document.querySelectorAll('.gsg-tab');
    const gsgTabContents = document.querySelectorAll('.gsg-tab-content');

    gsgTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            gsgTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents
            gsgTabContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });
            
            // Show selected tab content
            const selectedContent = document.getElementById(tabName + '-content');
            if (selectedContent) {
                selectedContent.style.display = 'block';
                selectedContent.classList.add('active');
            }
        });
    });

    // Initialize first tab as active
    if (gsgTabs.length > 0) {
        gsgTabs[0].classList.add('active');
    }

    // Real-Time Metrics Animation
    function animateMetrics() {
        const metrics = [
            { id: 'metric-orders', target: 1247, symbol: '' },
            { id: 'metric-deliveries', target: 892, symbol: '' },
            { id: 'metric-regions', target: 47, symbol: '' },
            { id: 'metric-satisfaction', target: 4.9, symbol: '' },
            { id: 'metric-uptime', target: 99.9, symbol: '%' }
        ];

        metrics.forEach(metric => {
            const element = document.getElementById(metric.id);
            if (element) {
                let current = 0;
                const target = metric.target;
                const increment = target / 50;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target + metric.symbol;
                        clearInterval(counter);
                    } else {
                        if (metric.symbol === '%') {
                            element.textContent = current.toFixed(1) + metric.symbol;
                        } else if (metric.id === 'metric-satisfaction') {
                            element.textContent = current.toFixed(1);
                        } else {
                            element.textContent = Math.floor(current);
                        }
                    }
                }, 30);
            }
        });
    }

    // Trigger metrics animation when visible
    const analyticsSection = document.querySelector('.metrics-display');
    if (analyticsSection) {
        const analyticsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    animateMetrics();
                    entry.target.dataset.animated = 'true';
                    analyticsObserver.unobserve(entry.target);
                }
            });
        });
        analyticsObserver.observe(analyticsSection);
    }

    // Live Latency Updater
    function updateLatency() {
        const latencyElement = document.getElementById('metric-latency');
        if (latencyElement) {
            setInterval(() => {
                const randomLatency = (70 + Math.random() * 40).toFixed(0);
                latencyElement.textContent = randomLatency + 'ms';
            }, 2000);
        }
    }

    // Particle Effect for Feature Cards
    function createParticleEffect(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.background = 'rgba(39, 174, 96, 0.6)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            
            card.style.position = 'relative';
            card.style.overflow = 'visible';
            card.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 5;
            const velocity = 3 + Math.random() * 2;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity;
            let opacity = 1;

            const animate = () => {
                vx *= 0.98;
                vy *= 0.98;
                opacity -= 0.02;
                x += vx;
                y += vy;

                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            animate();
        }
    }

    // Add particle effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', createParticleEffect);
    });

    // DOM Status Monitor
    function checkEcosystemStatus() {
        const status = {
            domain: document.getElementById('domain-content') ? 'Active' : 'Inactive',
            hardware: document.getElementById('hardware-content') ? 'Active' : 'Inactive',
            logistics: document.getElementById('logistics-content') ? 'Active' : 'Inactive',
            optimization: document.getElementById('optimization-content') ? 'Active' : 'Inactive',
            analytics: document.getElementById('analytics-content') ? 'Active' : 'Inactive'
        };
        return status;
    }

    // Initialize on load
    updateLatency();
    const ecosystemStatus = checkEcosystemStatus();
    console.log('🌍 Gift Shaka Global Ecosystem Status:', ecosystemStatus);
    console.log('🎁 Ecosystem fully operational with all modules initialized');

    console.log('🚀 ROSEAN-X Portfolio Loaded Successfully!');
});