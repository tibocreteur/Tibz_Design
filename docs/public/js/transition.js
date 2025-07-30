// Fonction de fade-out à l'arrivée
function fadeOutOverlay() {
    const overlay = document.getElementById('transition-overlay');
    overlay.classList.add('fade-out');
}

// Quand la page charge normalement
window.addEventListener('load', fadeOutOverlay);

// Quand la page est rechargée depuis le cache (retour arrière)
window.addEventListener('pageshow', (event) => {
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        fadeOutOverlay();
    }
});

// Gestion des clics pour fade-in
document.querySelectorAll('a[href]').forEach(link => {
    const isSameSite = link.hostname === window.location.hostname;
    const isBlank = link.target === "_blank";
    const isAnchor = link.getAttribute('href').startsWith('#');

    if (!isSameSite || isBlank || isAnchor) return;

    link.addEventListener('click', function (e) {
        e.preventDefault();

        const overlay = document.getElementById('transition-overlay');
        const logo = document.getElementById('loading-logo');

        // Supprime la classe fade-out pour démarrer le fade-in
        overlay.classList.remove('fade-out');

        // Affiche le logo (au cas où il aurait été masqué)
        if (logo) {
            logo.style.opacity = "1";
        }

        // Si la transition est trop longue (ex : +2s), on affiche un logo alternatif ou modifie le logo
        setTimeout(() => {
            if (!overlay.classList.contains('fade-out')) {
                // Par exemple : changer l'image du logo ou lui ajouter une animation
                if (logo) {
                    logo.src = "logo-alternatif.png"; // <- à adapter
                    // logo.classList.add("spinner"); // <- si tu veux ajouter une animation CSS
                }
            }
        }, 2000);

        // Attend 400 ms avant de naviguer vers la page
        setTimeout(() => {
            window.location.href = this.href;
        }, 400);
    });
});
