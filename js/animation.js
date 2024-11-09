window.addEventListener('scroll', function () {
    const image = document.getElementById('scroll-image');
    const scrollPosition = window.scrollY;
    const maxScroll = 900; // Valeur après laquelle l'effet commence
  
    // Calculer l'intensité de l'effet d'assombrissement en fonction du scroll
    const opacity = Math.min(scrollPosition / maxScroll, 1);
  
    // Appliquer l'effet d'assombrissement
    image.style.filter = `brightness(${1 - opacity})`;
});