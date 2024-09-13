// team.js

document.addEventListener('DOMContentLoaded', function() {
   

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.style.display = 'none');
        testimonials[index].style.display = 'block';
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    showTestimonial(currentTestimonial);
    setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds

    // Animate stats when in viewport
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.team-stats');

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const count = +stat.innerText;
            const increment = target / 200; // Adjust for animation speed

            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 1);
            } else {
                stat.innerText = target;
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
        }
    });

    observer.observe(statsSection);

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lightbox initialization (if not already initialized by the lightbox library)
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.querySelector('.slider-arrow.left');
    const nextButton = document.querySelector('.slider-arrow.right');
    let currentIndex = 0;
    let isAnimating = false;

    function fadeImage(oldSrc, newSrc, callback) {
        isAnimating = true;
        mainImage.style.opacity = 0;
        
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.style.opacity = 1;
            setTimeout(() => {
                isAnimating = false;
                if (callback) callback();
            }, 300);
        }, 300);
    }

    function updateMainImage(index) {
        if (isAnimating) return;
        
        const newSrc = thumbnails[index].src;
        fadeImage(mainImage.src, newSrc, () => {
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[index].classList.add('active');
            currentIndex = index;
        });
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => updateMainImage(index));
    });

    function navigateImage(direction) {
        if (isAnimating) return;
        const newIndex = (currentIndex + direction + thumbnails.length) % thumbnails.length;
        updateMainImage(newIndex);
    }

    prevButton.addEventListener('click', () => navigateImage(-1));
    nextButton.addEventListener('click', () => navigateImage(1));

    // Initialize with the first image
    updateMainImage(0);
});