// On attend que le DOM soit chargé pour commencer
window.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  initParticles();
  initAnimations();
});

window.addEventListener("hashchange", setActiveLink);

// --- 1. FONCTIONS FETCH ---
async function loadHeader() {
  const placeholder = document.getElementById("header-placeholder");
  if (!placeholder) return;

  try {
    const response = await fetch("/components/Navigation/header.html");
    if (!response.ok) throw new Error("Fichier header.html introuvable");

    const html = await response.text();
    placeholder.innerHTML = html;

    setActiveLink();
    attachSmoothScroll();
    // On lance le ScrollSpy une fois que le header est injecté
    initScrollSpy();
  } catch (error) {
    console.error("Erreur Header:", error);
  }
}

// --- 2. LOGIQUE DU LIEN ACTIF ---
function setActiveLink() {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash || "#accueil";
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.remove("active");

    if (href.startsWith("#")) {
      if (href === currentHash) {
        link.classList.add("active");
      }
    } else if (currentPath.includes(href) && href !== "") {
      link.classList.add("active");
    }
  });
}

// --- 3. SCROLLSPY (Détection auto au défilement) ---
function initScrollSpy() {
  const sections = document.querySelectorAll(
    "section[id], header[id], div[id]",
  );
  const navLinks = document.querySelectorAll("nav ul li a");

  const options = {
    root: null,
    rootMargin: "-20% 0px -70% 0px", // Déclenche quand la section occupe le haut/milieu
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = "#" + entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, options);

  sections.forEach((section) => observer.observe(section));
}

// --- 4. FETCH FOOTER ---
async function loadFooter() {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return;

  try {
    const response = await fetch("/components/Footer/footer.html");
    if (!response.ok) throw new Error("Fichier footer.html introuvable");
    const html = await response.text();
    placeholder.innerHTML = html;
    attachSmoothScroll();
  } catch (error) {
    console.error("Erreur Footer:", error);
  }
}

// --- 5. PARTICULES ---
function initParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

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
}

// --- 6. ANIMATIONS AU SCROLL ---
function initAnimations() {
  const cards = document.querySelectorAll(".skill-card");
  if (cards.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
  });
}

// --- 7. SMOOTH SCROLL ---
function attachSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.removeEventListener("click", handleSmoothScroll);
    anchor.addEventListener("click", handleSmoothScroll);
  });
}

function handleSmoothScroll(e) {
  const targetId = this.getAttribute("href");
  const target = document.querySelector(targetId);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, null, targetId);
  }
}

// --- 8. changer le theme ---
function setTheme(theme) {
  const body = document.body;
  // Correction ici : on cible .bouton-theme
  const buttons = document.querySelectorAll(".bouton-theme");

  // 1. Gérer la classe sur le body
  if (theme === "light") {
    body.classList.add("light-mode");
  } else {
    body.classList.remove("light-mode");
  }

  // 2. Gérer l'état actif des boutons
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    // On vérifie si le bouton a la classe 'sombre' pour le thème 'dark'
    // ou 'clair' pour le thème 'light'
    if (
      (theme === "dark" && btn.classList.contains("sombre")) ||
      (theme === "light" && btn.classList.contains("clair"))
    ) {
      btn.classList.add("active");
    }
  });

  // 3. Sauvegarder
  localStorage.setItem("preferred-theme", theme);
}

// Au chargement
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("preferred-theme") || "dark"; // "dark" par défaut
  setTheme(savedTheme);
});

//Pour les carte de previsualisation de projet
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  let currentIndex = 1; // La carte du milieu par défaut (index 1)

  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.remove("active", "prev", "next", "hidden");

      if (index === currentIndex) {
        card.classList.add("active");
      } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
        card.classList.add("prev");
      } else if (index === (currentIndex + 1) % cards.length) {
        card.classList.add("next");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Initialisation
  updateCarousel();
});
