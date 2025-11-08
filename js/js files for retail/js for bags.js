// Preloader functionality
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return; // Safety check

  // Keep preloader visible for 5 seconds
  setTimeout(() => {
    preloader.classList.add("fade-out");

    // Hide it completely after fade animation
    setTimeout(() => {
      preloader.style.display = "none";
    }, 800);
  }, 3000);
});

const products = [
  {
    img: 'https://user-images.githubusercontent.com/44365106/141667770-35b30b12-7e1a-4b41-af0b-e9ca4236f81d.png',
    title: 'Girl Printed Lawn Shirt & Slv On Lawn, Lawn Dupatta',
    price: 'PKR 4,499',
  },
  {
    img: 'https://user-images.githubusercontent.com/44365106/141667771-7b59f8b2-c47e-46a4-87a0-d70f41bc220e.png',
    title: 'Girl Printed Lawn Shirt & Slv On Lawn, Lawn Dupatta',
    price: 'PKR 4,499',
  },
  // Add all other products here similar to above with img, title, price keys
];

const productsContainer = document.getElementById('products');

products.forEach(({ img, title, price }) => {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${img}" alt="${title}" class="card-img-top" />
      <div class="card-body d-flex flex-column">
        <h5 class="product-title">${title}</h5>
        <p class="product-price mt-auto">${price}</p>
      </div>
    </div>
  `;
  productsContainer.appendChild(col);
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

