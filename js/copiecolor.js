// Sélectionner toutes les couleurs
const colors = document.querySelectorAll('.color');
const copiedMessage = document.querySelector('.copied-message');  // Message "copié"

// Fonction de copie et affichage du message
colors.forEach(color => {
    color.addEventListener('click', () => {
        const colorCode = color.getAttribute('data-text'); // Récupérer le code couleur (data-text)

        // Créer un champ input temporaire pour copier le texte
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = colorCode;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Afficher un message "copié"
        copiedMessage.style.display = 'block';
        copiedMessage.textContent = `💾 Information copied`;  // Affiche le code couleur copié
        setTimeout(() => {
            copiedMessage.style.display = 'none';
        }, 900); // Le message disparaît après 1,5 seconde
    });
});




