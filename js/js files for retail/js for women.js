  // Preloader functionality
        window.addEventListener("load", () => {
          const preloader = document.getElementById("preloader");
          if (!preloader) return; // Safety check

          // Keep preloader visible for 3 seconds
          setTimeout(() => {
            preloader.classList.add("fade-out");

            // Hide it completely after fade animation
            setTimeout(() => {
              preloader.style.display = "none";
            }, 800);
          }, 3000);
        });

        // 3D tilt effect for product cards
        const cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / 20) * -1;
                const rotateY = ((x - centerX) / 20);
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
            });
        });

        // Cart functionality
        let cartCount = 0;
        const addToCartButtons = document.querySelectorAll('.btn-outline-dark');
        const cartCountElement = document.getElementById('cart-count');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                cartCount++;
                cartCountElement.textContent = cartCount;
                
                // Add animation effect
                this.textContent = 'Added!';
                this.classList.remove('btn-outline-dark');
                this.classList.add('btn-success');
                
                setTimeout(() => {
                    this.textContent = 'Add To Cart';
                    this.classList.remove('btn-success');
                    this.classList.add('btn-outline-dark');
                }, 1500);
            });
        });

        function submitNewsletter() {
            const email = document.getElementById('newsletterEmail').value;
            alert('Thank you for subscribing with email: ' + email);
            document.getElementById('newsletterEmail').value = '';
        }

        function sendWhatsapp() {
            const number = document.getElementById('whatsappNumber').value;
            alert('Whatsapp number submitted: ' + number);
            document.getElementById('whatsappNumber').value = '';
        }