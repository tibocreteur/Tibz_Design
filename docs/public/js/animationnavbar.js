let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
    const navbar = document.getElementById("navbar");

    // Ne rien faire si écran petit (mobile)
    if (window.innerWidth < 768) {
        navbar.classList.remove("navbar-hidden");
        return;
    }

    let currentScrollPos = window.pageYOffset;

    if (currentScrollPos === 0) {
        navbar.classList.add("navbar-hidden");
    } else if (prevScrollPos < currentScrollPos) {
        navbar.classList.add("navbar-hidden");
    } else {
        navbar.classList.remove("navbar-hidden");
    }

    prevScrollPos = currentScrollPos;
};