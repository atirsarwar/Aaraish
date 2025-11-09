 // Fixed JavaScript for hamburger menu and hero section

  // Hero Slider Functionality
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");

  // Move next slide
  function goNext() {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").appendChild(items[0]);
  }

  // Move previous slide
  function goPrev() {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").prepend(items[items.length - 1]);
  }

  // Event listeners
  next.addEventListener("click", goNext);
  prev.addEventListener("click", goPrev);

  // ============================
  // AUTO PLAY
  // ============================
  let autoPlayInterval = 2500; // 2.5 seconds
  let autoPlay = setInterval(goNext, autoPlayInterval);

  // Optional: Pause autoplay on hover
  let slideContainer = document.querySelector(".slide");
  slideContainer.addEventListener("mouseenter", () => clearInterval(autoPlay));
  slideContainer.addEventListener("mouseleave", () => {
    autoPlay = setInterval(goNext, autoPlayInterval);
  });

  // Modal functionality + 3D tilt hover
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".uhome-card");
    const modal = document.getElementById("uhomeModal");
    const modalImg = document.getElementById("uhomeModalImg");
    const modalTitle = document.getElementById("uhomeModalTitle");
    const modalDesc = document.getElementById("uhomeModalDesc");
    const closeBtn = document.querySelector(".uhome-close");

    // 3D hover effect
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / 20) * -1;
        const rotateY = ((x - centerX) / 20);
        card.style.setProperty("--rotateX", rotateX + "deg");
        card.style.setProperty("--rotateY", rotateY + "deg");
        card.classList.add("tilt");
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("tilt");
        card.style.setProperty("--rotateX", "0deg");
        card.style.setProperty("--rotateY", "0deg");
      });
    });

    // Modal open
    document.querySelectorAll(".uhome-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".uhome-card");
        modalImg.src = card.dataset.img;
        modalTitle.textContent = card.dataset.title;
        modalDesc.textContent = card.dataset.desc;
        modal.style.display = "flex";
      });
    });

    // Close modal
    closeBtn.addEventListener("click", () => (modal.style.display = "none"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  });

  // Toggle Men / Women Products
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const womenProducts = document.getElementById("women-products");
  const menProducts = document.getElementById("men-products");

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active from all
      toggleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Show based on button
      if (btn.dataset.target === "women") {
        womenProducts.classList.remove("d-none");
        menProducts.classList.add("d-none");
      } else {
        menProducts.classList.remove("d-none");
        womenProducts.classList.add("d-none");
      }
    });
  });

  // Slide Header Toggle
  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggleSlideHeader");
    const slideHeader = document.querySelector(".slide-header");
    const arrow = toggleBtn.querySelector(".arrow");

    toggleBtn.addEventListener("click", () => {
      slideHeader.classList.toggle("active");
      arrow.textContent = slideHeader.classList.contains("active") ? "▲" : "▼";
    });
  });

  // Smooth preloader (4 seconds duration)
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    // Delay for 4 seconds before fade out
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 800);
    }, 4000);
  });