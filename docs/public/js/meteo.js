// Sélectionner toutes les images
const images = document.querySelectorAll('.tri-images img');

// Fonction pour changer le fond de la section
function changeBackground(event) {
    const section = document.getElementById('fondmeteo');
    
    // Change l'image de fond de la section selon l'image survolée
    if (event.target.id === "metteo") {
        section.style.backgroundImage = "url('../image/mouvaplan/ciel1.jpg')";
    } else if (event.target.id === "metteo1") {
        section.style.backgroundImage = "url('../image/mouvaplan/ciel2.jpg')";
    } else if (event.target.id === "metteo2") {
        section.style.backgroundImage = "url('../image/mouvaplan/ciel3.jpg')";
    }
}

// Ajoute un écouteur d'événement au survol pour chaque image
images.forEach(image => {
    image.addEventListener('mouseover', changeBackground);
});


