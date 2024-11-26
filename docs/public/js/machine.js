document.addEventListener("DOMContentLoaded", function() {
    const profilElement = document.querySelector(".profilbas p");
    const profilHTML = profilElement.innerHTML; // Récupère le contenu HTML avec les <br> et autres éléments
    profilElement.innerHTML = ""; // Vide temporairement le contenu du <p>
    let index = 0;
    let isTextAnimated = false;

    // Remplacer les balises <br> par un caractère spécial pour les traiter
    const formattedText = profilHTML.replace(/<br\s*\/?>/gi, '\n'); // Remplace <br> par des retours à la ligne

    // Fonction pour animer le texte en respectant les <br> et espaces
    function typeWriter() {
        if (index < formattedText.length) {
            const currentChar = formattedText.charAt(index);

            // Si le caractère est un retour à la ligne (représenté par '\n'), on ajoute un <br>
            if (currentChar === "\n") {
                profilElement.innerHTML += "<br>";
            } else {
                // Ajoute le caractère normalement
                profilElement.innerHTML += currentChar;
            }

            index++;

            // Délai entre chaque caractère (ajustable pour la vitesse)
            const randomDelay = Math.random() * (30 - 20) + 5; // Délai compris entre 20ms et 50ms
            if (Math.random() > 0.9) {
                const longPause = Math.random() * (100 - 50) + 50; // Pause plus longue entre certains caractères
                setTimeout(typeWriter, longPause);
            } else {
                setTimeout(typeWriter, randomDelay); // Intervalle de temps plus court entre les caractères
            }
        }
    }

    // Créer un observer pour détecter lorsque l'élément est visible
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTextAnimated) {
                // L'élément est visible dans la fenêtre
                isTextAnimated = true;  // Pour éviter de lancer l'animation plusieurs fois
                
                // Ajoute un délai de 500ms avant de commencer l'animation (ajustable)
                setTimeout(() => {
                    typeWriter(); // Lance l'animation après le délai
                }, 1000);

                observer.unobserve(entry.target); // On arrête d'observer après l'animation
            }
        });
    }, { threshold: 1}); // 50% de l'élément doit être visible pour déclencher l'animation

    // Observer l'élément
    observer.observe(profilElement);
});






