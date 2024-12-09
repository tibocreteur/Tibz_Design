// Fonction pour ouvrir le panneau
function openPanel() {
    // Afficher l'overlay
    document.getElementById("overlay").style.display = "block";
    
    // Afficher le panneau
    document.getElementById("panel").style.display = "block";

    // Ajouter un listener pour fermer le panneau en cas de défilement
    window.addEventListener('scroll', handleScroll);
}

// Fonction pour fermer le panneau
function closePanel() {
    // Cacher l'overlay
    document.getElementById("overlay").style.display = "none";
    
    // Cacher le panneau
    document.getElementById("panel").style.display = "none";

    // Supprimer le listener de défilement pour éviter des appels inutiles
    window.removeEventListener('scroll', handleScroll);
}

// Fonction déclenchée par l'événement de défilement
function handleScroll() {
    closePanel(); // Ferme le panneau quand l'utilisateur scrolle
}

// Gestionnaire d'événements pour le clic du bouton navbar
document.querySelector('.navbar-button').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut
    openPanel(); // Ouvre le panneau
});
