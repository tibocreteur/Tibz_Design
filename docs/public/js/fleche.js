let lastScrollTop = 0; // Position de scroll précédente
const arrowElement = document.querySelector('.basdetoppage');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // Quand on descend
        arrowElement.classList.add('flechedubasinvisible');
    } else {
        // Quand on remonte
        if (currentScroll == 0) {
            arrowElement.classList.remove('flechedubasinvisible');
        }
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // pour éviter des valeurs négatives
});
