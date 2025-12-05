// Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Create particle background
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 20 + 5;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const opacity = Math.random() * 0.1 + 0.05;
                const animationDuration = Math.random() * 20 + 10;
                const animationDelay = Math.random() * 5;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.opacity = opacity;
                particle.style.animationDuration = `${animationDuration}s`;
                particle.style.animationDelay = `${animationDelay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }

        // Shopping Cart System
        class ShoppingCart {
            constructor() {
                this.cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
                this.init();
            }
            
            init() {
                this.updateCartCount();
                this.bindEvents();
                this.loadCart();
            }
            
            bindEvents() {
                // Cart icon click events
                document.getElementById('cartIcon').addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openCart();
                });
                
                document.getElementById('cartIconMain').addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openCart();
                });
                
                // Close cart events
                document.getElementById('closeCart').addEventListener('click', () => this.closeCart());
                document.getElementById('cartOverlay').addEventListener('click', () => this.closeCart());
                document.getElementById('continueShopping').addEventListener('click', () => this.closeCart());
                
                // Checkout button
                document.getElementById('checkoutBtn').addEventListener('click', () => this.checkout());
                
                // Add to cart buttons
                document.querySelectorAll('.add-to-cart').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const product = {
                            id: e.target.dataset.id,
                            name: e.target.dataset.name,
                            price: parseInt(e.target.dataset.price),
                            image: e.target.dataset.image,
                            quantity: parseInt(document.getElementById(`quantity-${e.target.dataset.id}`).value),
                            size: document.getElementById(`size-${e.target.dataset.id}`).value
                        };
                        this.addToCart(product);
                    });
                });
            }
            
            addToCart(product) {
                const existingItem = this.cart.find(item => 
                    item.id === product.id && item.size === product.size
                );
                
                if (existingItem) {
                    existingItem.quantity += product.quantity;
                } else {
                    this.cart.push(product);
                }
                
                this.saveCart();
                this.updateCartCount();
                this.showAddToCartAnimation();
            }
            
            removeFromCart(productId, size) {
                this.cart = this.cart.filter(item => 
                    !(item.id === productId && item.size === size)
                );
                this.saveCart();
                this.updateCartCount();
                this.loadCart();
            }
            
            updateQuantity(productId, size, newQuantity) {
                if (newQuantity <= 0) {
                    this.removeFromCart(productId, size);
                    return;
                }
                
                const item = this.cart.find(item => 
                    item.id === productId && item.size === size
                );
                if (item) {
                    item.quantity = newQuantity;
                    this.saveCart();
                    this.updateCartCount();
                    this.loadCart();
                }
            }
            
            saveCart() {
                localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
            }
            
            updateCartCount() {
                const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
                document.getElementById('cart-count').textContent = totalItems;
                document.getElementById('cart-count-main').textContent = totalItems;
            }
            
            loadCart() {
                const cartBody = document.getElementById('cartBody');
                const cartTotal = document.getElementById('cartTotal');
                
                if (this.cart.length === 0) {
                    cartBody.innerHTML = `
                        <div class="empty-cart">
                            <div class="empty-cart-icon">🛒</div>
                            <h5>Your cart is empty</h5>
                            <p>Add some products to get started!</p>
                        </div>
                    `;
                    cartTotal.textContent = 'Rs. 0';
                    return;
                }
                
                let cartHTML = '';
                let total = 0;
                
                this.cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    
                    cartHTML += `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                            <div class="cart-item-details">
                                <h6 class="cart-item-name">${item.name}</h6>
                                <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
                                <div class="cart-item-details">
                                    <small>Size: ${item.size}</small>
                                </div>
                                <div class="cart-item-controls">
                                    <button class="quantity-btn minus" data-id="${item.id}" data-size="${item.size}">-</button>
                                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}" data-size="${item.size}">
                                    <button class="quantity-btn plus" data-id="${item.id}" data-size="${item.size}">+</button>
                                    <button class="remove-item" data-id="${item.id}" data-size="${item.size}">Remove</button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                cartBody.innerHTML = cartHTML;
                cartTotal.textContent = `Rs. ${total.toLocaleString()}`;
                
                // Bind quantity controls
                cartBody.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = e.target.dataset.id;
                        const size = e.target.dataset.size;
                        const item = this.cart.find(item => 
                            item.id === id && item.size === size
                        );
                        if (item) {
                            this.updateQuantity(id, size, item.quantity - 1);
                        }
                    });
                });
                
                cartBody.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = e.target.dataset.id;
                        const size = e.target.dataset.size;
                        const item = this.cart.find(item => 
                            item.id === id && item.size === size
                        );
                        if (item) {
                            this.updateQuantity(id, size, item.quantity + 1);
                        }
                    });
                });
                
                cartBody.querySelectorAll('.quantity-input').forEach(input => {
                    input.addEventListener('change', (e) => {
                        const id = e.target.dataset.id;
                        const size = e.target.dataset.size;
                        const newQuantity = parseInt(e.target.value);
                        if (!isNaN(newQuantity) && newQuantity > 0) {
                            this.updateQuantity(id, size, newQuantity);
                        }
                    });
                });
                
                cartBody.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = e.target.dataset.id;
                        const size = e.target.dataset.size;
                        this.removeFromCart(id, size);
                    });
                });
            }
            
            openCart() {
                this.loadCart();
                document.getElementById('cartModal').classList.add('active');
                document.getElementById('cartOverlay').classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            closeCart() {
                document.getElementById('cartModal').classList.remove('active');
                document.getElementById('cartOverlay').classList.remove('active');
                document.body.style.overflow = '';
            }
            
            checkout() {
                if (this.cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                
                alert('Proceeding to checkout with ' + this.cart.reduce((total, item) => total + item.quantity, 0) + ' items');
                // In a real implementation, you would redirect to a checkout page
            }
            
            showAddToCartAnimation() {
                // Create a temporary animation element
                const animation = document.createElement('div');
                animation.textContent = '✓ Added to Cart';
                animation.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--dark-maroon);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    z-index: 2000;
                    font-weight: 600;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    animation: fadeInOut 2s ease-in-out;
                `;
                
                document.body.appendChild(animation);
                
                setTimeout(() => {
                    document.body.removeChild(animation);
                }, 2000);
            }
        }

        // Initialize the shopping cart
        const shoppingCart = new ShoppingCart();

        // Preloader functionality
        window.addEventListener("load", () => {
            createParticles();
            
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

        // Sticky Navigation
        const stickyNav = document.getElementById('stickyNav');
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        window.addEventListener('scroll', () => {
            // Show/hide sticky nav
            if (window.scrollY > 100) {
                stickyNav.classList.add('sticky-active');
            } else {
                stickyNav.classList.remove('sticky-active');
            }
            
            // Show/hide scroll to top button
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Scroll animations for product cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe product cards for fade-in effect
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
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