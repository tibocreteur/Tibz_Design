// Sélectionne tous les boutons
const buttons = document.querySelectorAll('.copy-button');
const copiedMessage = document.querySelector('.copied-message');

// Fonction de copie et affichage du message
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const textToCopy = button.getAttribute('data-text');

        // Créer un champ input temporaire pour copier le texte
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = textToCopy;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Afficher le message "copié"
        copiedMessage.style.display = 'block';
        setTimeout(() => {
            copiedMessage.style.display = 'none';
        }, 1500); // Le message disparaît après 1,5 seconde

        // Changer la couleur de fond du bouton en vert
        button.style.backgroundColor = 'black';  // Le vert que tu souhaites

        // Optionnel : Remettre la couleur initiale après quelques secondes (par exemple 1 seconde)
        setTimeout(() => {
            button.style.backgroundColor = '';  // Remet la couleur d'origine
        }, 1000);  // Après 1 seconde
    });
});




