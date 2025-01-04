const burgerToggle = document.getElementById("burger-toggle");
const burgerMenu = document.getElementById("burger-menu");

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
  burgerToggle.classList.toggle("active");
  burgerMenu.classList.toggle("active");
}

// Fonction pour fermer le menu
function closeMenu() {
  burgerToggle.classList.remove("active");
  burgerMenu.classList.remove("active");
}

// Ouvrir/fermer le menu lorsqu'on clique sur le bouton
burgerToggle.addEventListener("click", toggleMenu);

// Fermer le menu lorsqu'on fait défiler la page
window.addEventListener("scroll", closeMenu);

