// ========================================
// THROTTLE & BREW CAFÉ - INTERACTIVE FEATURES
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ========================================
    
    const navLinks = document.querySelectorAll('.nav-links a');
    const navLinksContainer = document.querySelector('.nav-links');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                navLinksContainer.classList.remove('active');
                
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileMenuToggle) {
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });

    // ========================================
    // DAILY SPECIAL MODAL
    // ========================================
    
    const modal = document.getElementById('daily-special-modal');
    const closeBtn = document.querySelector('.modal-close');
    const modalBtn = document.querySelector('.modal-btn');
    
    // Show modal after 2 seconds (manage focus for accessibility)
    let _lastActiveElement = null;
    setTimeout(function() {
        if (modal) {
            _lastActiveElement = document.activeElement;
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            // focus first focusable element (close button)
            if (closeBtn) closeBtn.focus();
        }
    }, 2000);
    
    // Close modal when clicking the X button (restore focus)
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
            if (_lastActiveElement && typeof _lastActiveElement.focus === 'function') {
                _lastActiveElement.focus();
            }
        });
    }
    
    // Close modal when clicking the action button (restore focus)
    if (modalBtn) {
        modalBtn.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
            if (_lastActiveElement && typeof _lastActiveElement.focus === 'function') {
                _lastActiveElement.focus();
            }
            // Scroll to menu section
            const menuSection = document.querySelector('#menu');
            const headerHeight = document.querySelector('#header') ? document.querySelector('#header').offsetHeight : 0;
            if (menuSection) {
                const targetPosition = menuSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
            if (_lastActiveElement && typeof _lastActiveElement.focus === 'function') {
                _lastActiveElement.focus();
            }
        }
    });

    // Close modal with Escape key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            if (_lastActiveElement && typeof _lastActiveElement.focus === 'function') {
                _lastActiveElement.focus();
            }
        }
    });

    // ========================================
    // BIKES & BREWS CARD HOVER EFFECTS
    // ========================================
    
    const bbCards = document.querySelectorAll('.bb-card');
    
    bbCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Scale and glow effect is handled by CSS
            // Additional JS interaction can be added here
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            // update aria-expanded
            const expanded = navLinksContainer.classList.contains('active');
            this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (spans && spans.length >= 3) {
                spans[0].style.transform = expanded ? 'rotate(45deg) translate(5px, 5px)' : 'none';
                spans[1].style.opacity = expanded ? '0' : '1';
                spans[2].style.transform = expanded ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
            }
        });
    }

    // ========================================
    // SCROLL ANIMATION FOR HEADER
    // ========================================
    
    const header = document.querySelector('#header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow to header when scrolling
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(205, 127, 50, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values using names
            const name = this.elements['name'] ? this.elements['name'].value.trim() : '';
            const email = this.elements['email'] ? this.elements['email'].value.trim() : '';
            const subject = this.elements['subject'] ? this.elements['subject'].value.trim() : '';
            const message = this.elements['message'] ? this.elements['message'].value.trim() : '';
            
            // Simple validation
            if (name && email && message) {
                alert(`Thank you, ${name}! We've received your message and will get back to you soon. Ride safe! 🏍️`);
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // ========================================
    // GALLERY ITEM CLICK EFFECT
    // ========================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            // Could open a lightbox here, for now just add a subtle effect
            console.log('Gallery image clicked:', img.alt);
        });
    });

    // ========================================
    // MENU ITEM HOVER SOUND EFFECT (VISUAL FEEDBACK)
    // ========================================
    
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(1deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // ========================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ========================================
    
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
        }
    });

    // ========================================
    // ANIMATE ELEMENTS ON SCROLL
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('.menu-section, .bikes-brews-section, .community-section, .gallery-section, .contact-section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });

    // ========================================
    // CONSOLE GREETING
    // ========================================
    
    console.log('%c🏍️ Throttle & Brew Café 🏍️', 'color: #cd7f32; font-size: 24px; font-weight: bold;');
    console.log('%cBuilt for riders, crafted for taste.', 'color: #f5f5f5; font-size: 14px;');
    console.log('%cWebsite loaded successfully. Enjoy your ride!', 'color: #cd7f32; font-size: 12px;');
});
