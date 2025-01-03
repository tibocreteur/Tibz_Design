// Sélectionner toutes les couleurs
const colors = document.querySelectorAll('.color');
const copiedMessage = document.querySelector('.copied-message');

// Fonction de copie et affichage du message
colors.forEach(color => {
    color.addEventListener('click', async () => {
        const colorCode = color.getAttribute('data-text'); // Récupère le code couleur (data-text)

        try {
            // Utilise l'API moderne pour copier du texte
            await navigator.clipboard.writeText(colorCode);

            // Ajoute une vibration (200ms)
            if ("vibrate" in navigator) {
                navigator.vibrate(200); // Vibrer pendant 200ms
            }

            // Affiche le message "copié"
            copiedMessage.style.display = 'block';

            // Cache le message après 900ms
            setTimeout(() => {
                copiedMessage.style.display = 'none';
            }, 900); // Le message disparaît après 900ms

        } catch (err) {
            console.error('Échec de la copie : ', err);
            alert('La copie a échoué. Veuillez réessayer.');
        }
    });
});






