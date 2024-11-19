// Sélectionne tous les boutons
const buttons = document.querySelectorAll('.copy-button');
const copiedMessage = document.querySelector('.copied-message');

// Fonction de copie et affichage du message
buttons.forEach(button => {
    button.addEventListener('click', async () => {
        const textToCopy = button.getAttribute('data-text');

        try {
            // Utilise l'API moderne pour copier du texte
            await navigator.clipboard.writeText(textToCopy);

            // Afficher le message "copié"
            copiedMessage.style.display = 'block';
            setTimeout(() => {
                copiedMessage.style.display = 'none';
            }, 900); // Le message disparaît après 1,5 seconde

            // Changer rapidement la couleur de fond du bouton en blanc
            button.style.backgroundColor = 'white';

            // Remettre la couleur initiale après un délai très court (100ms)
            setTimeout(() => {
                button.style.backgroundColor = ''; // Réinitialise la couleur
            }, 100); // Après 100ms
        } catch (err) {
            console.error('Échec de la copie : ', err);
            alert('La copie a échoué. Veuillez réessayer.');
        }
    });
});






