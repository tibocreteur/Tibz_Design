// scripts.js

// Déclaration de l'objet pour stocker les traductions des différentes langues
const translations = {
    fr: {},
    en: {}
};

// Fonction pour charger les traductions depuis les fichiers JSON
async function loadTranslations(lang) {
    const response = await fetch(`./json/${lang}.json`);
    translations[lang] = await response.json();
}

// Fonction pour mettre à jour le texte de la page selon la langue sélectionnée
function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-key]'); // Tous les éléments avec l'attribut data-key
    elements.forEach(el => {
        const key = el.getAttribute('data-key'); // Clé de traduction
        el.textContent = translations[lang][key] || el.textContent; // Remplacer le texte par la traduction
    });

    // Mettre à jour l'attribut lang de la balise HTML
    document.documentElement.lang = lang;
}

// Fonction pour récupérer la langue sauvegardée ou la langue du navigateur
function setLanguage() {
    const savedLang = localStorage.getItem('lang'); // Récupérer la langue dans le localStorage
    const userLang = savedLang || (navigator.language.startsWith('fr') ? 'fr' : 'en'); // Si pas de langue sauvegardée, utiliser la langue du navigateur
    updateTexts(userLang); // Appliquer la langue
}

// Fonction pour changer la langue au clic sur les boutons
document.getElementById('btn-fr').addEventListener('click', () => {
    updateTexts('fr'); // Appliquer le français
    localStorage.setItem('lang', 'fr'); // Sauvegarder la langue dans le localStorage
});

document.getElementById('btn-en').addEventListener('click', () => {
    updateTexts('en'); // Appliquer l'anglais
    localStorage.setItem('lang', 'en'); // Sauvegarder la langue dans le localStorage
});

// Charger les traductions et définir la langue au démarrage
Promise.all([loadTranslations('fr'), loadTranslations('en')]).then(() => {
    setLanguage(); // Appliquer la langue sauvegardée ou celle détectée du navigateur
});
