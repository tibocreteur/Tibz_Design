const fs = require('fs');
var path = require('path');

const translationsFolder = './json/';
const buildDir = './docs/'
const htmlDir = './html/'

const getNestedTranslation = (obj, keyPath) => {
    return keyPath.split('.').reduce((acc, part) => {
        return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj);
};

const fixPath = (template) => {
    const regex = new RegExp(/(\"\.\/\.\.\/)/, 'g');
    const regex2 = new RegExp(/(\"\.\.\/)/, 'g');

    template = template.replace(regex, (match, key) => {
        return key + '../';
    });

    template = template.replace(regex2, (match, key) => {
        return key + '../';
    })

    return template;
}

fs.readdir(translationsFolder, (err, files) => {
    files.forEach(file => {
        const langIsoCode = path.basename(file, '.json')

        if (!fs.existsSync(buildDir + langIsoCode)){
            fs.mkdirSync(buildDir + langIsoCode, { recursive: true });
        }

        const translations = JSON.parse(fs.readFileSync(translationsFolder + file, 'utf-8'));
        console.log(translations)

        fs.readdir(htmlDir, (err, files) => {
            files.forEach(file => {
                let template = fs.readFileSync(htmlDir + file, 'utf-8');
                const regex = new RegExp(/\{\{\s?([a-zA-Z.]+)\s?\}\}/, 'g');
                template = template.replace(regex, (match, key) => {
                    const translation = getNestedTranslation(translations, key);
                    return typeof translation === 'string' ? translation : match;
                });

                template = fixPath(template);

                const outputPath = `${buildDir}${langIsoCode}/${file}`;
                fs.writeFileSync(outputPath, template);
                console.log(`Generated ${outputPath}`);
            })
        });
    });
});