document.querySelectorAll('.copy-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const textToCopy = icon.getAttribute('data-text');
      
      // Créer un champ temporaire pour copier
      const tempInput = document.createElement('input');
      document.body.appendChild(tempInput);
      tempInput.value = textToCopy;
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
  
      alert('Texte copié : ' + textToCopy); // Optionnel : Message de confirmation
    });
  });
  