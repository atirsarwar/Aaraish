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

