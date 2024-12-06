// Fonction pour ouvrir le panneau
function openPanel() {
    // Afficher l'overlay
    document.getElementById("overlay").style.display = "block";
    
    // Afficher le panneau
    document.getElementById("panel").style.display = "block";
}

// Fonction pour fermer le panneau
function closePanel() {
    // Cacher l'overlay
    document.getElementById("overlay").style.display = "none";
    
    // Cacher le panneau
    document.getElementById("panel").style.display = "none";
}

document.querySelector('.navbar-button').addEventListener('click', function (event) {
        event.preventDefault(); // Empêche le comportement par défaut
        openPanel(); // Appelle ta fonction pour ouvrir le panneau
});