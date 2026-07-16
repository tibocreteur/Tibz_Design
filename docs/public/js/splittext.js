// Split-text reveal (inspired by reactbits.dev/text-animations/split-text)
// Splits an element's text into per-character spans and reveals them with a stagger on scroll into view.
(function () {
    function wrapChars(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            for (const ch of node.textContent) {
                if (ch === ' ') {
                    frag.appendChild(document.createTextNode(' '));
                } else {
                    const span = document.createElement('span');
                    span.className = 'split-char';
                    span.textContent = ch;
                    frag.appendChild(span);
                }
            }
            node.replaceWith(frag);
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
            Array.from(node.childNodes).forEach(wrapChars);
        }
    }

    function initSplitText(selector, options) {
        const opts = Object.assign({ stagger: 50, duration: 1.25 }, options || {});
        document.querySelectorAll(selector).forEach(function (el) {
            Array.from(el.childNodes).forEach(wrapChars);
            const chars = el.querySelectorAll('.split-char');
            chars.forEach(function (span, i) {
                span.style.transitionDelay = (i * opts.stagger) + 'ms';
                span.style.transitionDuration = opts.duration + 's';
            });

            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        el.classList.add('split-in-view');
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(el);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initSplitText('.tibz-info__hero-title', { stagger: 50, duration: 1.25 });
    });
})();
