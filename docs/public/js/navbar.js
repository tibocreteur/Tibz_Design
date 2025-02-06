// ================================================================
// 1. Gestion du scroll de la navbar (avec mise à jour immédiate)
// ================================================================

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const socialcontact = document.querySelector(".social-contact");
    const boutonlogo = document.querySelector(".navbar-button-logo");
    const triggerElement = document.getElementById("section");
    const offset = 62; // Décalage avant déclenchement

    function checkNavbar() {
        if (!triggerElement) return;

        const triggerPosition = triggerElement.getBoundingClientRect().top;

        if (triggerPosition <= offset) {
            navbar.classList.remove("scrolled");
            socialcontact.classList.remove("scrolled");
            boutonlogo.classList.remove("scrolled");
        } else {
            navbar.classList.add("scrolled");
            socialcontact.classList.add("scrolled");
            boutonlogo.classList.add("scrolled");
        }
    }

    // Vérification immédiate au chargement
    checkNavbar();

    // Écouteur d'événement pour mettre à jour lors du scroll
    window.addEventListener("scroll", checkNavbar);
});
