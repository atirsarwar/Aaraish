 // Shopping Cart System
        class ShoppingCart {
            constructor() {
                this.cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
                this.init();
            }
            
            init() {
                this.updateCartCount();
                this.setupEventListeners();
                this.renderCart();
            }
            
            setupEventListeners() {
                // Cart icon click
                document.getElementById('cartIcon').addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openCart();
                });
                
                document.getElementById('cartIconMain').addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openCart();
                });
                
                // Close cart
                document.getElementById('closeCart').addEventListener('click', () => this.closeCart());
                document.getElementById('cartOverlay').addEventListener('click', () => this.closeCart());
                document.getElementById('continueShopping').addEventListener('click', () => this.closeCart());
                
                // Checkout button
                document.getElementById('checkoutBtn').addEventListener('click', () => this.checkout());
                
                // Add to cart buttons
                document.querySelectorAll('.add-to-cart').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productCard = e.target.closest('.card');
                        const id = e.target.getAttribute('data-id');
                        const name = e.target.getAttribute('data-name');
                        const price = parseInt(e.target.getAttribute('data-price'));
                        const image = e.target.getAttribute('data-image');
                        const quantityInput = productCard.querySelector('.quantity-input');
                        const quantity = parseInt(quantityInput.value);
                        
                        this.addToCart({ id, name, price, image, quantity });
                        
                        // Show feedback
                        const originalText = e.target.textContent;
                        e.target.textContent = 'Added!';
                        e.target.classList.remove('btn-outline-dark');
                        e.target.classList.add('btn-success');
                        
                        setTimeout(() => {
                            e.target.textContent = originalText;
                            e.target.classList.remove('btn-success');
                            e.target.classList.add('btn-outline-dark');
                        }, 1500);
                    });
                });
                
                // Quantity controls on product cards
                document.querySelectorAll('.increase-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const input = e.target.parentElement.querySelector('.quantity-input');
                        input.value = parseInt(input.value) + 1;
                    });
                });
                
                document.querySelectorAll('.decrease-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const input = e.target.parentElement.querySelector('.quantity-input');
                        if (parseInt(input.value) > 1) {
                            input.value = parseInt(input.value) - 1;
                        }
                    });
                });
            }
            
            addToCart(product) {
                const existingItem = this.cart.find(item => item.id === product.id);
                
                if (existingItem) {
                    existingItem.quantity += product.quantity;
                } else {
                    this.cart.push(product);
                }
                
                this.saveCart();
                this.updateCartCount();
                this.renderCart();
            }
            
            removeFromCart(id) {
                this.cart = this.cart.filter(item => item.id !== id);
                this.saveCart();
                this.updateCartCount();
                this.renderCart();
            }
            
            updateQuantity(id, newQuantity) {
                if (newQuantity < 1) {
                    this.removeFromCart(id);
                    return;
                }
                
                const item = this.cart.find(item => item.id === id);
                if (item) {
                    item.quantity = newQuantity;
                    this.saveCart();
                    this.updateCartCount();
                    this.renderCart();
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
            
            openCart() {
                document.getElementById('cartModal').classList.add('active');
                document.getElementById('cartOverlay').classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            closeCart() {
                document.getElementById('cartModal').classList.remove('active');
                document.getElementById('cartOverlay').classList.remove('active');
                document.body.style.overflow = '';
            }
            
            renderCart() {
                const container = document.getElementById('cartItemsContainer');
                
                if (this.cart.length === 0) {
                    container.innerHTML = `
                        <div class="empty-cart">
                            <p>Your cart is empty</p>
                            <p>Add some products to get started!</p>
                        </div>
                    `;
                    document.getElementById('cartSubtotal').textContent = 'Rs. 0';
                    document.getElementById('cartTotal').textContent = 'Rs. 200';
                    return;
                }
                
                let html = '';
                let subtotal = 0;
                
                this.cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    subtotal += itemTotal;
                    
                    html += `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                            <div class="cart-item-details">
                                <h6 class="cart-item-title">${item.name}</h6>
                                <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
                                <div class="quantity-controls">
                                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                                </div>
                                <button class="remove-item" data-id="${item.id}">Remove</button>
                            </div>
                        </div>
                    `;
                });
                
                container.innerHTML = html;
                document.getElementById('cartSubtotal').textContent = `Rs. ${subtotal.toLocaleString()}`;
                document.getElementById('cartTotal').textContent = `Rs. ${(subtotal + 200).toLocaleString()}`;
                
                // Add event listeners to cart items
                container.querySelectorAll('.increase').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const id = e.target.getAttribute('data-id');
                        const input = e.target.parentElement.querySelector('.quantity-input');
                        const newQuantity = parseInt(input.value) + 1;
                        this.updateQuantity(id, newQuantity);
                    });
                });
                
                container.querySelectorAll('.decrease').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const id = e.target.getAttribute('data-id');
                        const input = e.target.parentElement.querySelector('.quantity-input');
                        const newQuantity = parseInt(input.value) - 1;
                        this.updateQuantity(id, newQuantity);
                    });
                });
                
                container.querySelectorAll('.quantity-input').forEach(input => {
                    input.addEventListener('change', (e) => {
                        const id = e.target.getAttribute('data-id');
                        const newQuantity = parseInt(e.target.value);
                        this.updateQuantity(id, newQuantity);
                    });
                });
                
                container.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const id = e.target.getAttribute('data-id');
                        this.removeFromCart(id);
                    });
                });
            }
            
            checkout() {
                if (this.cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                
                alert('Proceeding to checkout!');
                // In a real implementation, this would redirect to a checkout page
            }
            
            clearCart() {
                this.cart = [];
                this.saveCart();
                this.updateCartCount();
                this.renderCart();
            }
        }

        // Initialize shopping cart
        const shoppingCart = new ShoppingCart();

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

        // Sticky Navigation
        window.addEventListener('scroll', () => {
            const stickyNav = document.querySelector('.sticky-nav');
            const mainNav = document.getElementById('mainNav');
            const scrollToTopBtn = document.getElementById('scrollToTop');
            
            if (window.scrollY > mainNav.offsetHeight) {
                stickyNav.classList.add('sticky-active');
            } else {
                stickyNav.classList.remove('sticky-active');
            }
            
            // Show/hide scroll to top button
            if (window.scrollY > 100) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top functionality
        document.getElementById('scrollToTop').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Original functions
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
