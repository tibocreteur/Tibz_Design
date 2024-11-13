window.addEventListener('scroll', function() {
    const zoomImage = document.querySelector('.zoom-image');
    const scrollValue = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const scaleValue =0 - scrollValue * 1.5; // Commence à 1.5 et dézoome jusqu'à 1
    zoomImage.style.transform = `scale(${scaleValue})`;
});
