document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("languageToggle");
    const contactLink = document.querySelector(".navbar-button");

    // Définir les couleurs pour les drapeaux
    const flagColors = {
        en: "#ffffff32",  // Exemple de couleur bleue pour l'anglais
        fr: "#ffffff32"   // Exemple de couleur bleue pour le français (change cette couleur si nécessaire)
    };

    // Récupérer la langue depuis le localStorage ou définir l'anglais par défaut
    let currentLanguage = localStorage.getItem("language") || "en";

    // Charger les traductions depuis des fichiers JSON
    async function loadLanguage(lang) {
        try {
            const response = await fetch(`../json/${lang}.json`); // Le chemin vers les fichiers JSON
            const translations = await response.json();
            updateTexts(translations);
        } catch (error) {
            console.error("Erreur lors du chargement des traductions :", error);
        }
    }

    // Fonction pour convertir les retours à la ligne (\n) en balises HTML <br>
    function convertNewlinesToHTML(text) {
        return text.replace(/\n/g, "<br>");
    }

    // Mettre à jour les textes du site
    function updateTexts(translations) {
        document.querySelectorAll("[data-key]").forEach((element) => {
            const key = element.getAttribute("data-key");
            if (translations[key]) {
                element.innerHTML = convertNewlinesToHTML(translations[key]); // Utilisation de innerHTML pour interpréter les <br>
            }
        });

        // Mise à jour du lien "mailto" avec le texte correct
        contactLink.href = `mailto:tibzdesign@gmail.com?subject=${encodeURIComponent(
            translations["contactSubject"]
        )}&body=${encodeURIComponent(translations["contactBody"])}`;
    }

    // Basculer entre anglais et français
    button.addEventListener("click", () => {
        if (currentLanguage === "en") {
            currentLanguage = "fr";
            button.style.backgroundColor = flagColors.fr;  // Changer la couleur de fond
        } else {
            currentLanguage = "en";
            button.style.backgroundColor = flagColors.en;  // Changer la couleur de fond
        }

        // Stocker la langue dans localStorage pour qu'elle persiste
        localStorage.setItem("language", currentLanguage);

        // Ensuite, charger la langue correspondante
        loadLanguage(currentLanguage);
    });

    // Initialiser avec la langue stockée dans le localStorage ou l'anglais par défaut
    if (currentLanguage === "fr") {
        button.style.backgroundColor = flagColors.fr;  // Initialiser la couleur de fond
    } else {
        button.style.backgroundColor = flagColors.en;  // Initialiser la couleur de fond
    }

    // Charger la langue lors du chargement de la page
    loadLanguage(currentLanguage);
});


