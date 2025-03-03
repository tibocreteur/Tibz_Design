const fs = require('fs');
const path = require('path');

const translationsFolder = './docs/public/json/';
const buildDir = './docs/';
const htmlDir = './html/';

const getNestedTranslation = (obj, keyPath) => {
    return keyPath.split('.').reduce((acc, part) => {
        return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj);
};

const fixPath = (template) => {
    const regex = new RegExp(/(\"\.\.\/docs)/, 'g');
    return template.replace(regex, '"./..');
};

// Vérifie si un dossier existe, sinon le crée
const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Lecture des fichiers JSON dans le dossier des traductions
fs.readdir(translationsFolder, (err, files) => {
    if (err) {
        console.error(`❌ Erreur de lecture du dossier JSON : ${err.message}`);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(translationsFolder, file);
        const langIsoCode = path.basename(file, '.json');

        // Vérification de l'existence et du contenu du fichier JSON
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️ Fichier introuvable : ${filePath}`);
            return;
        }

        let fileContent = fs.readFileSync(filePath, 'utf-8').trim();
        if (!fileContent) {
            console.warn(`⚠️ Fichier JSON vide : ${filePath}`);
            return;
        }

        let translations;
        try {
            translations = JSON.parse(fileContent);
        } catch (error) {
            console.error(`❌ Erreur de parsing JSON dans ${filePath} : ${error.message}`);
            return;
        }

        // Création du dossier de sortie
        const langOutputDir = path.join(buildDir, langIsoCode);
        ensureDirectoryExists(langOutputDir);

        // Lecture des fichiers HTML
        fs.readdir(htmlDir, (err, htmlFiles) => {
            if (err) {
                console.error(`❌ Erreur de lecture du dossier HTML : ${err.message}`);
                return;
            }

            htmlFiles.forEach(htmlFile => {
                const htmlFilePath = path.join(htmlDir, htmlFile);
                let template = fs.readFileSync(htmlFilePath, 'utf-8');

                // Remplacement des clés de traduction
                const regex = /\{\{\s?([a-zA-Z.]+)\s?\}\}/g;
                template = template.replace(regex, (match, key) => {
                    const translation = getNestedTranslation(translations, key);
                    return typeof translation === 'string' ? translation : match;
                });

                // Correction des chemins
                template = fixPath(template);

                // Écriture du fichier généré
                const outputPath = path.join(langOutputDir, htmlFile);
                fs.writeFileSync(outputPath, template);
                console.log(`✅ Fichier généré : ${outputPath}`);
            });
        });
    });
});
