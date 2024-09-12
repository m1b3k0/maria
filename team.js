// team.js

document.addEventListener('DOMContentLoaded', function() {
    // Team member filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teamMembers = document.querySelectorAll('.team-member');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            teamMembers.forEach(member => {
                if (filter === 'all' || member.getAttribute('data-role') === filter) {
                    member.style.display = 'block';
                } else {
                    member.style.display = 'none';
                }
            });
        });
    });

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