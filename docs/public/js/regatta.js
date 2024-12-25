function updateImageSource() {
    const image = document.getElementById('responsive-image');
    const screenWidth = window.innerWidth;
  
    if (screenWidth >= 1200) {
      image.src = './../docs/public/image/regatta/dehors.jpg';
    } else if (screenWidth >= 768) {
      image.src = './../docs/public/image/regatta/fond.jpg';
    } else {
      image.src = './../docs/public/image/regatta/dehors.jpg';
    }
  }
  
  // Appeler la fonction au chargement et lors du redimensionnement
  window.addEventListener('load', updateImageSource);
  window.addEventListener('resize', updateImageSource);
  