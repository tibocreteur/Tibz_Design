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
        overlay.classList.remove('fade-out');

        setTimeout(() => {
            window.location.href = this.href;
        }, 400);
    });
});
