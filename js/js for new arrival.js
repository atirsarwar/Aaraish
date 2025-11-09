// Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: function() {
                // Disable AOS on mobile devices to use our custom animations
                return window.innerWidth < 768;
            }
        });

        // Smooth preloader (5 seconds duration)
        window.addEventListener("load", () => {
            const preloader = document.getElementById("preloader");

            // Delay for 5 seconds before fade out
            setTimeout(() => {
                preloader.classList.add("fade-out");
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 800);
            }, 4000);
        });

        document.addEventListener("DOMContentLoaded", () => {
            const toggleBtn = document.getElementById("toggleSlideHeader");
            const slideHeader = document.querySelector(".slide-header");
            const arrow = toggleBtn.querySelector(".arrow");

            // Toggle slide header
            toggleBtn.addEventListener("click", () => {
                slideHeader.classList.toggle("active");
                arrow.textContent = slideHeader.classList.contains("active") ? "▲" : "▼";
            });

            // Accordion slider functionality
            const slides = document.querySelectorAll('.slide');
            
            slides.forEach(slide => {
                slide.addEventListener('click', () => {
                    // Remove active class from all slides
                    slides.forEach(s => s.classList.remove('active'));
                    // Add active class to clicked slide
                    slide.classList.add('active');
                });
            });

            // Custom scroll animations for mobile
            if (window.innerWidth < 768) {
                const animatedElements = document.querySelectorAll('.mobile-fade-up, .mobile-slide-in-left, .mobile-slide-in-right, .mobile-zoom-in');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animated');
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                animatedElements.forEach(element => {
                    observer.observe(element);
                });
            }
        });