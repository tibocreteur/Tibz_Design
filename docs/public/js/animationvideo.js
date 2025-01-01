window.addEventListener('scroll', function () {
    const video = document.getElementById('scroll-video'); // Remplacez l'ID par celui de votre vidéo
    const scrollPosition = window.scrollY;
    const maxScroll = 900; // Valeur après laquelle l'effet commence

    // Calculer l'intensité de l'effet d'assombrissement en fonction du scroll
    const opacity = Math.min(scrollPosition / maxScroll, 1);

    // Appliquer l'effet d'assombrissement
    video.style.filter = `brightness(${1 - opacity})`;
});
