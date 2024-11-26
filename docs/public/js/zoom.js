window.addEventListener('scroll', function() {
    const zoomImage = document.querySelector('.zoom-image');
    const scrollValue = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const scaleValue =1 - scrollValue * 3; // Commence à 1.5 et dézoome jusqu'à 1
    zoomImage.style.transform = `scale(${scaleValue})`;
});
