// Global Variables and Configuration
let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
let particles = [];
let neuralNodes = [];
let connections = [];
let animationId;
let skillTooltip;
let isLoading = true;
let mouseX = 0;
let mouseY = 0;
let cursorFollower;

// Performance and Animation Settings
const PARTICLE_COUNT = 150;
const NEURAL_NODE_COUNT = 30;
const FPS_LIMIT = 60;
const ANIMATION_DURATION = 1000;

// Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

const lerp = (start, end, factor) => start + (end - start) * factor;

const getRandomBetween = (min, max) => Math.random() * (max - min) + min;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Initialize core systems
        await initializeLoading();
        initializeTheme();
        initializeCursor();
        initializeNavigation();
        initializeParticleSystem();
        initializeNeuralNetwork();
        initializeScrollAnimations();
        initializeHeroAnimations();
        initializeSkillsGalaxy();
        initializeTiltEffects();
        initializeContactForm();
        initializePWA();
        initializePerformanceOptimizations();
        
        console.log('🚀 Futuristic Portfolio - All systems initialized!');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
}

// Advanced Loading System
async function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingWord = document.querySelector('.loading-word');
    
    const loadingTexts = [
        'Initializing Systems...',
        'Loading Neural Networks...',
        'Calibrating Particles...',
        'Preparing Holograms...',
        'Syncing Data...',
        'Ready for Launch!'
    ];
    
    let progress = 0;
    let textIndex = 0;
    
    // Create loading particles
    createLoadingParticles();
    
    const loadingInterval = setInterval(() => {
        progress += getRandomBetween(5, 15);
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    startInitialAnimations();
                }, 800);
            }, 500);
        }
        
        // Update progress
        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        // Update loading text
        if (progress > (textIndex + 1) * (100 / loadingTexts.length)) {
            textIndex = Math.min(textIndex + 1, loadingTexts.length - 1);
            loadingWord.textContent = loadingTexts[textIndex];
        }
    }, getRandomBetween(100, 300));
}

function createLoadingParticles() {
    const particlesContainer = document.querySelector('.loading-particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = getRandomBetween(2, 6) + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'var(--color-primary)';
        particle.style.borderRadius = '50%';
        particle.style.left = getRandomBetween(0, 100) + '%';
        particle.style.top = getRandomBetween(0, 100) + '%';
        particle.style.opacity = getRandomBetween(0.3, 0.8);
        particle.style.animation = `float-particle ${getRandomBetween(2, 6)}s ease-in-out infinite`;
        particle.style.animationDelay = getRandomBetween(0, 2) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Theme Management
function initializeTheme() {
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon();
    
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-color-scheme', currentTheme);
            updateThemeIcon();
        }
    });
}

function toggleTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    themeToggle.style.transform = 'rotateY(180deg)';
    
    setTimeout(() => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
        
        themeToggle.style.transform = 'rotateY(0deg)';
        
        // Trigger particle color update
        updateParticleColors();
    }, 200);
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Custom Cursor System
function initializeCursor() {
    cursorFollower = document.getElementById('cursor-follower');
    const cursorInner = document.querySelector('.cursor-inner');
    const cursorOuter = document.querySelector('.cursor-outer');
    
    if (!cursorFollower) return;
    
    let isVisible = false;
    
    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
        cursorFollower.style.display = 'none';
        return;
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isVisible) {
            cursorFollower.style.opacity = '1';
            isVisible = true;
        }
        
        requestAnimationFrame(() => {
            cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            cursorOuter.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });
    });
    
    document.addEventListener('mouseleave', () => {
        cursorFollower.style.opacity = '0';
        isVisible = false;
    });
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .tilt-card, .skill-node, .project-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });
}

// Navigation System
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Smooth scroll navigation
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Scroll spy and navbar effects
    window.addEventListener('scroll', throttle(() => {
        handleScrollSpy();
        handleNavbarScroll();
    }, 10));
    
    // Mobile menu
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu
        document.getElementById('nav-menu').classList.remove('active');
        document.getElementById('mobile-menu-toggle').classList.remove('active');
    }
}

function handleScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Advanced Particle System
function initializeParticleSystem() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.min(PARTICLE_COUNT, Math.floor((canvas.width * canvas.height) / 12000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 3 + 1,
                alpha: Math.random() * 0.6 + 0.2,
                hue: Math.random() * 60 + 180, // Cyan to blue range
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Mouse interaction
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x -= dx * force * 0.01;
                particle.y -= dy * force * 0.01;
                particle.alpha = Math.min(1, particle.alpha + force * 0.02);
            } else {
                particle.alpha = Math.max(0.2, particle.alpha - 0.01);
            }
            
            // Pulse effect
            const pulse = Math.sin(Date.now() * particle.pulseSpeed) * 0.5 + 0.5;
            const currentRadius = particle.radius * (0.8 + pulse * 0.4);
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.alpha})`;
            ctx.fill();
            
            // Draw glow
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, currentRadius * 3
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.alpha * 0.3})`);
            gradient.addColorStop(1, 'hsla(180, 70%, 60%, 0)');
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentRadius * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `hsla(180, 70%, 60%, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    animateParticles();
    
    window.addEventListener('resize', debounce(resizeCanvas, 250));
}

// Neural Network Background
function initializeNeuralNetwork() {
    const canvas = document.getElementById('neural-network-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createNeuralNodes();
    }
    
    function createNeuralNodes() {
        neuralNodes = [];
        connections = [];
        
        for (let i = 0; i < NEURAL_NODE_COUNT; i++) {
            neuralNodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 4 + 2,
                activity: Math.random(),
                lastActivity: 0
            });
        }
        
        // Create connections
        neuralNodes.forEach((node, i) => {
            const connectionCount = Math.floor(Math.random() * 4) + 2;
            for (let j = 0; j < connectionCount; j++) {
                const targetIndex = Math.floor(Math.random() * neuralNodes.length);
                if (targetIndex !== i) {
                    connections.push({
                        from: i,
                        to: targetIndex,
                        strength: Math.random() * 0.5 + 0.5,
                        pulseTime: 0
                    });
                }
            }
        });
    }
    
    function animateNeuralNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const time = Date.now() * 0.001;
        
        // Update and draw connections
        connections.forEach(connection => {
            const fromNode = neuralNodes[connection.from];
            const toNode = neuralNodes[connection.to];
            
            if (!fromNode || !toNode) return;
            
            // Update pulse
            connection.pulseTime += 0.02;
            if (connection.pulseTime > 1) {
                connection.pulseTime = 0;
                toNode.activity = Math.min(1, toNode.activity + 0.3);
            }
            
            // Draw connection
            const alpha = connection.strength * 0.2;
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.strokeStyle = `rgba(50, 184, 198, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw pulse
            if (connection.pulseTime > 0 && connection.pulseTime < 1) {
                const pulseX = lerp(fromNode.x, toNode.x, connection.pulseTime);
                const pulseY = lerp(fromNode.y, toNode.y, connection.pulseTime);
                
                ctx.beginPath();
                ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(50, 184, 198, ${1 - connection.pulseTime})`;
                ctx.fill();
            }
        });
        
        // Update and draw nodes
        neuralNodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Wrap around
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Update activity
            node.activity = Math.max(0, node.activity - 0.01);
            
            // Draw node
            const alpha = 0.3 + node.activity * 0.7;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(50, 184, 198, ${alpha})`;
            ctx.fill();
            
            // Draw glow
            if (node.activity > 0.1) {
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius * 4
                );
                gradient.addColorStop(0, `rgba(50, 184, 198, ${node.activity * 0.3})`);
                gradient.addColorStop(1, 'rgba(50, 184, 198, 0)');
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        });
        
        requestAnimationFrame(animateNeuralNetwork);
    }
    
    resizeCanvas();
    animateNeuralNetwork();
    
    window.addEventListener('resize', debounce(resizeCanvas, 250));
}

function updateParticleColors() {
    // This would update particle colors based on theme if needed
    // For now, we keep the cyan/blue theme regardless of light/dark mode
}

// Hero Section Animations
function startInitialAnimations() {
    initializeTypewriter();
    initializeCounters();
    initializeParallax();
}

function initializeTypewriter() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const roles = [
        'Data Analyst',
        'ML Engineer',
        'AI Enthusiast',
        'Problem Solver',
        'Innovation Driver'
    ];
    
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const current = roles[currentRole];
        
        if (isDeleting) {
            typingText.textContent = current.substring(0, currentChar - 1);
            currentChar--;
        } else {
            typingText.textContent = current.substring(0, currentChar + 1);
            currentChar++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentChar === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            typeSpeed = 500; // Pause before starting new word
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    setTimeout(typeWriter, 1000);
}

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

function initializeParallax() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    const parallaxHandler = throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroContent.style.transform = `translateY(${rate}px)`;
    }, 10);
    
    window.addEventListener('scroll', parallaxHandler);
}

// Advanced Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-scroll]').forEach(element => {
        observer.observe(element);
    });
}

// Skills Galaxy System
function initializeSkillsGalaxy() {
    const skillsGalaxy = document.querySelector('.skills-galaxy');
    if (!skillsGalaxy) return;
    
    const skillNodes = document.querySelectorAll('.skill-node');
    skillTooltip = document.getElementById('skill-tooltip');
    
    // Position skill nodes in orbits
    positionSkillNodes();
    
    // Add hover effects
    skillNodes.forEach(node => {
        node.addEventListener('mouseenter', showSkillTooltip);
        node.addEventListener('mouseleave', hideSkillTooltip);
        node.addEventListener('mousemove', updateTooltipPosition);
    });
    
    // Animate connections between nodes
    createSkillConnections();
    
    window.addEventListener('resize', debounce(positionSkillNodes, 250));
}

function positionSkillNodes() {
    const systems = document.querySelectorAll('.skill-system');
    
    systems.forEach(system => {
        const nodes = system.querySelectorAll('.skill-node');
        const radius = 80;
        const centerX = 100;
        const centerY = 100;
        
        nodes.forEach((node, index) => {
            const angle = (index / nodes.length) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius - 25; // -25 for node width/2
            const y = centerY + Math.sin(angle) * radius - 25;
            
            node.style.left = x + 'px';
            node.style.top = y + 'px';
        });
    });
}

function showSkillTooltip(event) {
    const node = event.target.closest('.skill-node');
    const skill = node.dataset.skill;
    const level = node.dataset.level;
    
    if (skillTooltip && skill && level) {
        skillTooltip.querySelector('.tooltip-skill').textContent = skill;
        skillTooltip.querySelector('.tooltip-level').textContent = level + '%';
        skillTooltip.querySelector('.progress-fill').style.width = level + '%';
        
        skillTooltip.classList.add('show');
        updateTooltipPosition(event);
    }
}

function hideSkillTooltip() {
    if (skillTooltip) {
        skillTooltip.classList.remove('show');
    }
}

function updateTooltipPosition(event) {
    if (skillTooltip && skillTooltip.classList.contains('show')) {
        const x = event.clientX + 10;
        const y = event.clientY - 10;
        
        skillTooltip.style.left = x + 'px';
        skillTooltip.style.top = y + 'px';
    }
}

function createSkillConnections() {
    const connectingLines = document.querySelector('.connecting-lines');
    if (!connectingLines) return;
    
    // This would create SVG lines connecting skill nodes
    // For now, we rely on CSS animations for the visual effect
}

// 3D Tilt Effects
function initializeTiltEffects() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
}

function resetTilt(e) {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
}

// Contact Form System
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const formLight = document.getElementById('form-light');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Enhanced form field effects
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
        input.addEventListener('input', handleInputChange);
    });
    
    // Initialize form validation
    initializeFormValidation();
}

function handleInputFocus(e) {
    const formGroup = e.target.closest('.form-group');
    formGroup.classList.add('focused');
    
    // Update form status light
    const formLight = document.getElementById('form-light');
    if (formLight) {
        formLight.classList.add('active');
    }
}

function handleInputBlur(e) {
    const formGroup = e.target.closest('.form-group');
    if (!e.target.value.trim()) {
        formGroup.classList.remove('focused');
    }
}

function handleInputChange(e) {
    validateField(e.target);
}

function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Add real-time validation styles
    const style = document.createElement('style');
    style.textContent = `
        .form-group.invalid input,
        .form-group.invalid textarea {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .form-group.valid input,
        .form-group.valid textarea {
            border-color: #22c55e;
            box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }
    `;
    document.head.appendChild(style);
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    const value = field.value.trim();
    let isValid = false;
    
    switch (field.type) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;
        case 'text':
        case 'textarea':
            isValid = value.length >= 2;
            break;
        default:
            isValid = value.length > 0;
    }
    
    formGroup.classList.remove('valid', 'invalid');
    if (value.length > 0) {
        formGroup.classList.add(isValid ? 'valid' : 'invalid');
    }
    
    return isValid;
}

async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.form-submit');
    const formStatus = document.getElementById('form-status');
    const formLight = document.getElementById('form-light');
    
    // Validate all fields
    const fields = form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showFormStatus('Please fill in all fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    const originalContent = submitButton.innerHTML;
    submitButton.innerHTML = `
        <span class="btn-content">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Launching...</span>
        </span>
        <div class="btn-glow"></div>
    `;
    submitButton.disabled = true;
    
    if (formLight) {
        formLight.style.background = '#fbbf24';
        formLight.style.boxShadow = '0 0 10px #fbbf24';
    }
    
    try {
        // Replace with your actual Formspree endpoint
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showFormStatus('🚀 Message launched successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Reset form field states
            fields.forEach(field => {
                const formGroup = field.closest('.form-group');
                formGroup.classList.remove('focused', 'valid', 'invalid');
            });
            
            if (formLight) {
                formLight.style.background = '#22c55e';
                formLight.style.boxShadow = '0 0 10px #22c55e';
            }
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showFormStatus('❌ Transmission failed. Please try again or contact me directly.', 'error');
        
        if (formLight) {
            formLight.style.background = '#ef4444';
            formLight.style.boxShadow = '0 0 10px #ef4444';
        }
    }
    
    // Reset button
    setTimeout(() => {
        submitButton.innerHTML = originalContent;
        submitButton.disabled = false;
        
        if (formLight) {
            formLight.style.background = '#6b7280';
            formLight.style.boxShadow = 'none';
        }
    }, 3000);
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    if (!formStatus) return;
    
    formStatus.querySelector('.status-message').textContent = message;
    formStatus.className = `form-status ${type} show`;
    
    setTimeout(() => {
        formStatus.classList.remove('show');
    }, 5000);
}

// Certificate Carousel
function initializeCertificateCarousel() {
    const prevBtn = document.getElementById('prev-cert');
    const nextBtn = document.getElementById('next-cert');
    const certTrack = document.getElementById('cert-track');
    
    if (!certTrack || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cardWidth = 270; // 250px + 20px gap
    const visibleCards = Math.floor(certTrack.parentElement.offsetWidth / cardWidth);
    const totalCards = certTrack.children.length;
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    function updateCarousel() {
        const translateX = -currentIndex * cardWidth;
        certTrack.style.transform = `translateX(${translateX}px)`;
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Auto-scroll
    setInterval(() => {
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel();
    }, 5000);
    
    updateCarousel();
}

// PWA Implementation
function initializePWA() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        registerServiceWorker();
    }
    
    // Add to home screen prompt
    initializeInstallPrompt();
    
    // Handle offline/online status
    initializeOfflineDetection();
}

async function registerServiceWorker() {
    try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('💫 Service Worker registered successfully');
        
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        showUpdateNotification();
                    }
                }
            });
        });
    } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
    }
}

function createServiceWorkerScript() {
    // Create service worker script dynamically
    const swScript = `
        const CACHE_NAME = 'rt-portfolio-v1';
        const urlsToCache = [
            '/',
            '/style.css',
            '/app.js',
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
        ];
        
        self.addEventListener('install', (event) => {
            event.waitUntil(
                caches.open(CACHE_NAME)
                    .then((cache) => cache.addAll(urlsToCache))
            );
        });
        
        self.addEventListener('fetch', (event) => {
            event.respondWith(
                caches.match(event.request)
                    .then((response) => {
                        if (response) {
                            return response;
                        }
                        return fetch(event.request);
                    })
            );
        });
    `;
    
    // Create blob and register
    const blob = new Blob([swScript], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);
    
    navigator.serviceWorker.register(swUrl)
        .then(() => console.log('💫 Service Worker registered'))
        .catch(error => console.error('❌ SW registration failed:', error));
}

// Call this instead of the separate SW file
createServiceWorkerScript();

function initializeInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallButton();
    });
    
    function showInstallButton() {
        // Create install button
        const installBtn = document.createElement('button');
        installBtn.innerHTML = `
            <i class="fas fa-download"></i>
            <span>Install App</span>
        `;
        installBtn.className = 'btn btn-primary install-btn';
        installBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(var(--color-primary), 0.3);
        `;
        
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log('Install prompt outcome:', outcome);
                deferredPrompt = null;
                installBtn.remove();
            }
        });
        
        document.body.appendChild(installBtn);
    }
}

function initializeOfflineDetection() {
    window.addEventListener('online', () => {
        console.log('🌐 Back online');
        showNetworkStatus('Connected', 'success');
    });
    
    window.addEventListener('offline', () => {
        console.log('📴 Offline mode');
        showNetworkStatus('Offline Mode', 'warning');
    });
}

function showNetworkStatus(message, type) {
    // Create network status notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `network-status ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #22c55e;' : 'background: #f59e0b;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showUpdateNotification() {
    // Show update available notification
    const notification = document.createElement('div');
    notification.innerHTML = `
        <span>New version available!</span>
        <button onclick="location.reload()">Refresh</button>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: var(--color-primary);
        color: white;
        padding: 16px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1001;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy loading for images
    initializeLazyLoading();
    
    // Reduce animations on low-end devices
    optimizeForPerformance();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Initialize intersection observers for animations
    initializeIntersectionObservers();
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

function optimizeForPerformance() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-duration', '0.5s');
    }
    
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
        // Disable particle systems
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }
}

function preloadCriticalResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.includes('.css') ? 'style' : 'font';
        if (resource.includes('font')) {
            link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
    });
}

function initializeIntersectionObservers() {
    // Optimize scroll animations
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollElements.forEach(el => scrollObserver.observe(el));
}

// Resume Download Functionality
function initializeResumeDownload() {
    const downloadBtn = document.getElementById('download-resume');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', downloadResume);
}

function downloadResume() {
    const resumeContent = generateResumeContent();
    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Rahul_Talvar_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success feedback
    const downloadBtn = document.getElementById('download-resume');
    const originalContent = downloadBtn.innerHTML;
    
    downloadBtn.innerHTML = `
        <span class="btn-content">
            <i class="fas fa-check"></i>
            <span>Downloaded!</span>
        </span>
        <div class="btn-glow"></div>
    `;
    
    setTimeout(() => {
        downloadBtn.innerHTML = originalContent;
    }, 2000);
}

function generateResumeContent() {
    return `
RAHUL TALVAR
Data Analyst | Machine Learning Engineer | AI Enthusiast

═══════════════════════════════════════════════════════════

CONTACT INFORMATION
📧 Email: rahultalvar902@gmail.com
📱 Phone: +91 9156184711
📍 Location: Pune, India
🔗 LinkedIn: linkedin.com/in/rahultalvar

═══════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY
Aspiring Data Analyst and Machine Learning Engineer with hands-on experience 
in Python, SQL, and data visualization. Passionate about leveraging analytical 
skills and problem-solving expertise to drive efficiency and effectiveness 
within organizations through innovative, data-driven decision-making.

═══════════════════════════════════════════════════════════

EDUCATION
🎓 BE in Artificial Intelligence and Data Science (2021-2025)
   Ajeenkya DY Patil School Of Engineering | SPPU | Ongoing

🎓 Higher Secondary Certificate (HSC) - 85.83% (2021)

🎓 Secondary School Certificate (SSC) - 87% (2019)

═══════════════════════════════════════════════════════════

TECHNICAL SKILLS

Programming Languages:
• Python (Advanced) - 90%
• SQL (Advanced) - 85%
• JavaScript (Intermediate) - 75%

Machine Learning & AI:
• Machine Learning - 90%
• Deep Learning - 85%
• Liquid Neural Networks - 80%
• Predictive Modeling - 88%

Data Analysis:
• Pandas & NumPy - 90%
• Data Cleaning & EDA - 92%
• Scikit-learn - 85%
• Statistical Analysis - 88%

Tools & Frameworks:
• Tableau - 85%
• Git & Version Control - 80%
• Flask - 75%
• Jupyter Notebook - 90%

═══════════════════════════════════════════════════════════

PROFESSIONAL EXPERIENCE

🏢 Data Science Intern | Technophilia Solution
📅 December 2023 - January 2024

Key Achievements:
• Developed a Python-based system to evaluate employee performance metrics
  → Result: 30% improvement in decision-making efficiency

• Automated evaluation processes using machine learning algorithms
  → Result: 20% reduction in manual effort and human bias

Technologies Used: Python, Machine Learning, Data Analysis, Performance Metrics

═══════════════════════════════════════════════════════════

FEATURED PROJECTS

🔬 1. Chest X-Ray Disease Prediction
• Revolutionary deep learning system using Liquid Neural Networks (LNNs)
• Achieved 94% accuracy for Pneumonia detection
• Achieved 90% accuracy for Lung Opacity classification
• Real-time diagnostic capabilities with Flask integration
• Technologies: Python, Deep Learning, LNN, Flask, Medical AI

📊 2. Loan Default Analysis
• Comprehensive predictive modeling for banking operations
• Built robust risk assessment system with actionable insights
• Applied advanced data preprocessing and feature engineering
• Technologies: Python, Machine Learning, Predictive Modeling, Financial Analysis

🚗 3. Uber Data Analysis
• Comprehensive EDA on 1M+ data points
• Created interactive dashboards and visualizations
• Uncovered 15+ key operational insights for business optimization
• Technologies: Python, Pandas, Tableau, Data Visualization, Statistical Analysis

═══════════════════════════════════════════════════════════

CERTIFICATIONS & TRAINING

🏆 Machine Learning Specialization | Coursera | 2023
   Comprehensive training in supervised/unsupervised learning and neural networks

🏆 Data Science Course | Technophilia Solution | 2023
   Intensive program covering data analysis, visualization, and ML applications

🏆 SQL 5-Day Bootcamp | Professional Training | 2023
   Advanced SQL techniques and database management

🏆 Personality Development Course | Professional Institute | 2023
   Professional communication and leadership skills development

═══════════════════════════════════════════════════════════

LANGUAGES
• English (Proficient)
• Hindi (Proficient)  
• Marathi (Native)

═══════════════════════════════════════════════════════════

KEY ACHIEVEMENTS & METRICS
✨ 3+ Complex Projects Completed
✨ 94% Average Model Accuracy
✨ 12+ Technical Skills Mastered
✨ 30% Efficiency Improvement in Professional Projects
✨ 4 Professional Certifications Earned

═══════════════════════════════════════════════════════════

INTERESTS & PASSION AREAS
🤖 Artificial Intelligence & Machine Learning
📊 Data Science & Analytics
🧠 Neural Networks & Deep Learning
💡 Innovation & Problem Solving
🚀 Emerging Technologies

═══════════════════════════════════════════════════════════

Generated from: https://rahultalvar-portfolio.netlify.app
Last Updated: ${new Date().toLocaleDateString()}

Thank you for your interest in my profile!
Ready to transform data into actionable insights? Let's connect!
    `.trim();
}

// Error Handling and Debugging
window.addEventListener('error', (e) => {
    console.error('🐛 JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('🔴 Unhandled Promise Rejection:', e.reason);
});

// Page Visibility API for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    } else {
        // Resume animations when tab becomes visible
        if (particles.length > 0) {
            animateParticles();
        }
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        document.getElementById('nav-menu').classList.remove('active');
        document.getElementById('mobile-menu-toggle').classList.remove('active');
    }
    
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Initialize certificate carousel and resume download
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initializeCertificateCarousel();
        initializeResumeDownload();
    }, 2000);
});

// Add keyboard navigation styles
const keyboardNavStyles = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
        border-radius: 4px;
    }
    
    .keyboard-nav .btn:focus {
        box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.3) !important;
    }
    
    @keyframes float-particle {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
        33% { transform: translateY(-20px) rotate(120deg); opacity: 1; }
        66% { transform: translateY(10px) rotate(240deg); opacity: 0.8; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = keyboardNavStyles;
document.head.appendChild(styleSheet);

console.log('🌟 Rahul Talvar - Futuristic Portfolio');
console.log('🚀 All systems operational!');
console.log('💫 Ready for the future of data science!');