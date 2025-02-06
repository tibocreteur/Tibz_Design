// Récupère la position de scroll AVANT que le navigateur affiche la page
const scrollPosition = localStorage.getItem("scrollPosition");
if (scrollPosition !== null) {
    window.scrollTo(0, parseInt(scrollPosition)); // Positionne immédiatement avant affichage
}

// Attends que la page soit chargée pour enregistrer la position avant le changement de langue
document.addEventListener("DOMContentLoaded", function() {
    const langButtons = document.querySelectorAll(".langButton");

    langButtons.forEach(button => {
        button.addEventListener("click", function() {
            localStorage.setItem("scrollPosition", window.scrollY);
        });
    });

    // Supprime la position stockée une fois le scroll restauré
    localStorage.removeItem("scrollPosition");
});

