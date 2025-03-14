function withCommonLanguage() {
    let liste_countries = Object.values(Country.all_countries);
    let resultat = [];

    for (let i = 0; i < liste_countries.length; i++) {
        let pays = liste_countries[i];
        let langues = pays.languages || [];
        let voisins = pays.getBorders();
        let langues_voisins = [];

        if (voisins) {
            for (let j = 0; j < voisins.length; j++) {
                let voisin = Country.getCountryByAlpha3Code(voisins[j]);
                if (voisin.languages) {
                    langues_voisins = langues_voisins.concat(voisin.languages);
                }
            }
        }

        let une_en_commun = langues.some(langue => 
            langues_voisins.some(langue_voisin => langue_voisin.iso639_1 === langue.iso639_1)
        );

        if (une_en_commun) {
            resultat.push(pays);
        }
    }

    console.table(resultat);
}

function withoutCommonCurrency() {
    let liste_countries = Object.values(Country.all_countries);
    let resultat = [];

    for (let i = 0; i < liste_countries.length; i++) {
        let pays = liste_countries[i];
        let monnaies = pays.currencies || [];
        let voisins = pays.getBorders();
        let monnaies_voisins = [];

        if (voisins) {
            for (let j = 0; j < voisins.length; j++) {
                let voisin = Country.getCountryByAlpha3Code(voisins[j]);
                if (voisin.currencies) {
                    monnaies_voisins = monnaies_voisins.concat(voisin.currencies);
                }
            }
        }

        let aucune_en_commun = monnaies.every(monnaie => 
            !monnaies_voisins.some(monnaie_voisin => monnaie_voisin.code === monnaie.code)
        );

        if (aucune_en_commun) {
            resultat.push(pays);
        }
    }

    console.table(resultat);
}

function sortingDecreasingDensity() {
    let liste_coutries = Object.values(Country.all_countries);
    let resultat = liste_coutries.sort((a, b) => b.getPopDensity() - a.getPopDensity());
    console.table(resultat);
}

function moreTopLevelDomains() {
    let liste_coutries = Object.values(Country.all_countries);
    let resultat = liste_coutries.sort((a, b) => b.topLevelDomains.length - a.topLevelDomains.length);
    console.table(resultat);
}