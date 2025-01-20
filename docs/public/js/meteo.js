// Sélectionner la section pour changer son fond
const section = document.getElementById('fondmeteo');

// Liste des chemins d'images à utiliser
const images = [
    './../public/image/mouvaplan/ciel1.avif',
    './../public/image/mouvaplan/ciel2.avif',
    './../public/image/mouvaplan/ciel3.avif'
];

// Index pour suivre quelle image est affichée
let currentIndex = 0;

// Fonction pour changer le fond de la section
function changeBackground() {
    // Met à jour l'image de fond
    section.style.backgroundImage = `url('${images[currentIndex]}')`;

    // Passe à l'image suivante (revient à la première après la dernière)
    currentIndex = (currentIndex + 1) % images.length;
}

// Change automatiquement toutes les 0.1 seconde (100ms)
setInterval(changeBackground, 2500);


