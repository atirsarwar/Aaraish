document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".atir-slide");
  const nextBtn = document.querySelector(".atir-next");
  const prevBtn = document.querySelector(".atir-prev");
  const dotsContainer = document.querySelector(".atir-dots");
  let current = 0;
  let timer;

  // Create dots dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll("span");

  function updateSlides() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
      dots[i].classList.toggle("active", i === current);
    });
  }

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    updateSlides();
    resetTimer();
  }

  nextBtn.addEventListener("click", () => goToSlide(current + 1));
  prevBtn.addEventListener("click", () => goToSlide(current - 1));

  function autoPlay() {
    timer = setInterval(() => goToSlide(current + 1), 4000);
  }

  function resetTimer() {
    clearInterval(timer);
    autoPlay();
  }

  updateSlides();
  autoPlay();
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("textileDropdown");
  const header = document.getElementById("headerSection");
  const bottomBar = document.getElementById("bottomBar");
  const arrow = dropdown.querySelector(".arrow");
  const cards = document.querySelectorAll(".header-card");

  dropdown.addEventListener("click", () => {
    const isActive = header.classList.toggle("active");
    bottomBar.classList.toggle("attached", isActive);
    arrow.textContent = isActive ? "▲" : "▼";

    if (isActive) {
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add("visible"), i * 100);
      });
    } else {
      cards.forEach(card => card.classList.remove("visible"));
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSlideHeader");
  const slideHeader = document.querySelector(".slide-header");
  const arrow = toggleBtn.querySelector(".arrow");

  toggleBtn.addEventListener("click", () => {
    slideHeader.classList.toggle("active");
    arrow.textContent = slideHeader.classList.contains("active") ? "▲" : "▼";
  });
});

// Premium Preloader with fixed duration (8 seconds)
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // Keep loader visible for 8 seconds
  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 800);
  }, 4000);
});
