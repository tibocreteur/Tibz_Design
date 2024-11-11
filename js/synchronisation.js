// Synchroniser les vidéos
const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');
const video3 = document.getElementById('video3');

// Fonction pour synchroniser les vidéos
function syncVideos() {
    // Mettre les vidéos 2 et 3 à la même position que la vidéo 1
    video2.currentTime = video1.currentTime;
    video3.currentTime = video1.currentTime;
}

// Démarrage de la lecture (synchroniser les vidéos à l'ouverture)
video1.addEventListener('play', function() {
    if (video2.paused) {
        video2.play();
    }
    if (video3.paused) {
        video3.play();
    }
});


video2.addEventListener('play', function() {
    if (video1.paused) {
        video1.play();
    }
    if (video3.paused) {
        video3.play();
    }
});

video3.addEventListener('play', function() {
    if (video1.paused) {
        video1.play();
    }
    if (video2.paused) {
        video2.play();
    }
});


// Synchroniser les vidéos lors d'un changement de position (seek)
video1.addEventListener('seeked', syncVideos);
video2.addEventListener('seeked', syncVideos);
video3.addEventListener('seeked', syncVideos);
