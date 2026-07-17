document.addEventListener('DOMContentLoaded', function () {
    var iframes = document.querySelectorAll('iframe[data-vimeo-src]');
    if (!iframes.length) return;

    var io = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            el.src = el.dataset.vimeoSrc;
            observer.unobserve(el);
        });
    }, { rootMargin: '300px 0px' });

    iframes.forEach(function (el) { io.observe(el); });
});
