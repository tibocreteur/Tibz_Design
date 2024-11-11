// Synchroniser les vidéos
const video4 = document.getElementById('video4');
const video5 = document.getElementById('video5');

// Fonction pour synchroniser les vidéos
function syncVideos() {
    // Mettre les vidéos 2 et 3 à la même position que la vidéo 1
    video4.currentTime = video5.currentTime;
}

// Démarrage de la lecture (synchroniser les vidéos à l'ouverture)
video5.addEventListener('play', function() {
    if (video4.paused) {
        video4.play();
    }
});
video4.addEventListener('play', function() {
    if (video5.paused) {
        video5.play();
    }
});


// Synchroniser les vidéos lors d'un changement de position (seek)
video4.addEventListener('seeked', syncVideos);
video5.addEventListener('seeked', syncVideos);
