document.addEventListener('DOMContentLoaded', () => {
    // Mobile Sidebar Logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeSidebar');
    const sidebarLinks = document.querySelectorAll('.mobile-nav-links a');

    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    if (mobileBtn) mobileBtn.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', toggleSidebar);
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply reveal to some elements
    const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .about-image, .about-text');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(el);
    });

    // Form Submission Handling
    const form = document.getElementById('enquiryForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message. Our design consultant will contact you shortly.');
                form.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    const nextSlide = () => {
        if (slides.length === 0) return;
        
        // Remove prev from any slides that had it
        slides.forEach(s => s.classList.remove('prev'));
        
        // Mark current slide as prev
        slides[currentSlide].classList.add('prev');
        slides[currentSlide].classList.remove('active');
        
        // Advance to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    // Auto cycle hero slides every 5 seconds
    if (slides.length > 1) {
        setInterval(nextSlide, 5000);
    }
});
