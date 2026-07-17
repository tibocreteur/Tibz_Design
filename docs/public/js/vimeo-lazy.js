document.addEventListener('DOMContentLoaded', function () {
    var iframes = document.querySelectorAll('iframe[data-vimeo-src]');
    if (!iframes.length) return;

    /* Vimeo's background-mode player briefly renders at the wrong scale
       while its internal resize JS settles. The poster (background-image
       on the wrapping .vimeo-container / .project-video-wrapper) is
       already a correctly-cropped static frame, so keep the iframe
       hidden behind it until well after the iframe has loaded. */
    iframes.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s ease';
    });

    var io = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            observer.unobserve(el);
            el.src = el.dataset.vimeoSrc;
            el.addEventListener('load', function () {
                setTimeout(function () { el.style.opacity = '1'; }, 1000);
            });
        });
    }, { rootMargin: '300px 0px' });

    iframes.forEach(function (el) { io.observe(el); });
});
