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
