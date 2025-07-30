// Charger la navbar HTML dans la page principale
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        // Insérer la navbar dans le conteneur
        document.getElementById('navbar-container').innerHTML = data;

        // Appeler une fonction d'initialisation du script après le chargement
        initNavbarScript();
    })
    .catch(error => console.error('Erreur de chargement de la navbar:', error));

// Fonction pour initialiser les événements du menu burger
function initNavbarScript() {
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
}