// main.js

document.addEventListener('DOMContentLoaded', () => {
    // // Mobile menu toggle
    // const menuToggle = document.querySelector('.menu-toggle');
    // const menuContent = document.querySelector('.menu-content');

    // if (menuToggle && menuContent) {
    //     menuToggle.addEventListener('click', () => {
    //         menuToggle.classList.toggle('active');
    //         menuContent.classList.toggle('active');
    //     });
    // }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server
            // For now, we'll just log it to the console
            const formData = new FormData(contactForm);
            console.log('Form submitted with data:', Object.fromEntries(formData));
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyLoadObserver.observe(img));

    // Add fade-in animation to elements as they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const submenuToggle = document.getElementById('mobile-submenu-toggle');
    const submenu = document.querySelector('.mobile-submenu');
    const submenuItems = submenu.querySelectorAll('li');
    const menuItemsBelow = document.querySelectorAll('.mobile-menu .desktopMenu-item:nth-child(n+4)');

    // Add event listener for main menu toggle
    menuToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    submenuToggle.addEventListener('change', function() {
        if (this.checked) {
            // Open submenu
            submenu.style.maxHeight = submenu.scrollHeight + "px";
            setTimeout(() => {
                submenuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "translateY(0)";
                    }, index * 50);
                });
            }, 50);

            // Push down menu items below Collections
            menuItemsBelow.forEach(item => {
                item.style.transform = `translateY(${submenu.scrollHeight}px)`;
            });
        } else {
            // Close submenu
            submenu.style.maxHeight = "0";
            submenuItems.forEach(item => {
                item.style.opacity = "0";
                item.style.transform = "translateY(-20px)";
            });

            // Reset position of menu items below Collections
            menuItemsBelow.forEach(item => {
                item.style.transform = "translateY(0)";
            });
        }
    });
});