window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar"); // Sélectionne la navbar
    const triggerElement = document.getElementById("section"); // Élément qui déclenche le changement
    const offset = 70; // Décalage de 50 pixels avant le déclenchement

    if (triggerElement) {
        const triggerPosition = triggerElement.getBoundingClientRect().top;

        if (triggerPosition <= offset) {
            navbar.classList.remove("scrolled"); // Retire la classe si on remonte
        } else {
            navbar.classList.add("scrolled"); // Retire la classe si on remonte
        }
    }

// Vérifie au chargement de la page
window.addEventListener("load", checkNavbar);

// Vérifie à chaque scroll
window.addEventListener("scroll", checkNavbar);

});

