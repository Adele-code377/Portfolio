// Génération des particules
const particlesContainer = document.getElementById("particles");
for (let i = 0; i < 30; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.width = Math.random() * 6 + 2 + "px";
  particle.style.height = particle.style.width;
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 15 + "s";
  particle.style.animationDuration = Math.random() * 10 + 10 + "s";
  particlesContainer.appendChild(particle);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animation au scroll pour les skill cards
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  card.style.transition = "all 0.6s ease-out";
  observer.observe(card);
});
