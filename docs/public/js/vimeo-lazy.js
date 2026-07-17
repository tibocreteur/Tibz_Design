document.addEventListener('DOMContentLoaded', function () {
    var slots = document.querySelectorAll('[data-vimeo-id]');
    if (!slots.length) return;

    /* The old approach (raw iframe src with ?background=1) measures the
       container once, on first load, to decide how to scale/crop the
       video. That single measurement is unreliable -- confirmed live,
       the same video would sometimes render undersized/offset inside
       its box, and it would NOT self-correct even after several
       seconds. The official Vimeo Player SDK, when it creates the
       iframe itself via `background: true`, keeps re-syncing the video
       size to the container (ResizeObserver-driven) instead of trusting
       a single early measurement, which is what actually fixes this. */

    function loadSdk(cb) {
        if (window.Vimeo && window.Vimeo.Player) { cb(); return; }
        if (loadSdk._loading) { loadSdk._callbacks.push(cb); return; }
        loadSdk._loading = true;
        loadSdk._callbacks = [cb];
        var s = document.createElement('script');
        s.src = 'https://player.vimeo.com/api/player.js';
        s.onload = function () {
            loadSdk._callbacks.forEach(function (fn) { fn(); });
        };
        document.head.appendChild(s);
    }

    function initSlot(el) {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.4s ease';
        loadSdk(function () {
            var player = new Vimeo.Player(el, {
                id: el.dataset.vimeoId,
                background: true,
                autoplay: true,
                muted: true,
                loop: true,
                dnt: true
            });
            player.ready().then(function () {
                el.style.opacity = '1';
            });
        });
    }

    var io = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            initSlot(entry.target);
        });
    }, { rootMargin: '300px 0px' });

    slots.forEach(function (el) { io.observe(el); });
});
