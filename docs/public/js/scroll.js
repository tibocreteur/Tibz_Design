// ========================================
// SMOOTH SCROLL SIMPLE ET EFFICACE
// Version équilibrée avec momentum léger
// ========================================

class CustomSmoothScroll {
    constructor(options = {}) {
        this.options = {
            smoothness: options.smoothness || 0.1,
            offset: options.offset || -100,
        };
        
        this.target = 0;
        this.current = 0;
        this.ease = this.options.smoothness;
        
        this.init();
    }
    
    init() {
        // Position initiale
        this.target = window.pageYOffset;
        this.current = window.pageYOffset;
        
        // Listeners
        this.addScrollListener();
        this.addAnchorListener();
        
        // Animation loop
        this.animate();
    }
    
    addScrollListener() {
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                this.target = window.pageYOffset;
            }
        }, { passive: true });
    }
    
    addAnchorListener() {
        // Attendre que le DOM soit prêt
        const setup = () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (!href || href === '#') return;
                    
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    
                    const target = document.querySelector(href);
                    if (target) {
                        const pos = target.getBoundingClientRect().top + window.pageYOffset + this.options.offset;
                        this.scrollTo(pos);
                    }
                });
            });
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
        } else {
            setup();
        }
    }
    
    scrollTo(position) {
        // Limites
        const max = document.documentElement.scrollHeight - window.innerHeight;
        this.target = Math.max(0, Math.min(position, max));
    }
    
    animate() {
        // Interpolation simple
        this.current += (this.target - this.current) * this.ease;
        
        // Arrêt si très proche
        if (Math.abs(this.target - this.current) < 0.5) {
            this.current = this.target;
        }
        
        // Application
        window.scrollTo(0, this.current);
        
        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// INIT
// ========================================
new CustomSmoothScroll({
    smoothness: 0.1,  // 0.05 = très smooth, 0.2 = rapide
    offset: -100
});