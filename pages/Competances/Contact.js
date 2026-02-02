// 1. On récupère l'endroit où on veut mettre les feuilles
const container = document.getElementById("leaf-container");

function createLeaf() {
  // 2. Création de l'élément HTML pour la feuille
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");

  // 3. Personnalisation aléatoire (pour que ce soit naturel)
  const startX = Math.random() * 100; // Position à gauche entre 0% et 100%
  const size = Math.random() * 15 + 10; // Taille entre 10px et 25px
  const duration = Math.random() * 5000 + 5000; // Vitesse entre 5s et 10s
  const delay = Math.random() * 5; // Délai avant de commencer

  leaf.style.left = startX + "vw";
  leaf.style.width = size + "px";
  leaf.style.height = size + "px";
  leaf.style.opacity = Math.random() * 0.5 + 0.2; // Opacité variée

  // 4. On ajoute la feuille dans la page
  container.appendChild(leaf);

  // 5. L'ANIMATION
  // .animate() prend deux choses : les étapes (keyframes) et les réglages (options)
  const animation = leaf.animate(
    [
      {
        top: "-5%",
        transform: "translateX(0) rotate(0deg)",
      },
      {
        top: "110%",
        // On ajoute un mouvement de balancier (X) et une rotation
        transform: `translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg)`,
      },
    ],
    {
      duration: duration,
      easing: "linear",
      delay: delay,
    },
  );

  // 6. NETTOYAGE
  // Une fois que l'animation est finie, on supprime la feuille du code HTML
  animation.onfinish = () => {
    leaf.remove();
  };
}

// 7. LANCEMENT
// On crée une nouvelle feuille toutes les 400 millisecondes
setInterval(createLeaf, 400);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll(".fill");
        fills.forEach((fill) => {
          const width = fill.style.width;
          fill.style.width = "0"; // On reset
          setTimeout(() => {
            fill.style.width = width; // On anime vers la valeur cible
            fill.style.transition = "width 1.5s ease-in-out";
          }, 100);
        });
      }
    });
  },
  { threshold: 0.2 },
);

observer.observe(document.querySelector(".technical-details-section"));
