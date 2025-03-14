function withCommonLanguage() {
    let liste_coutries = Object.values(Country.all_countries);
    let resultat = liste_coutries.filter(country => country.languages.length > 1);
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
                monnaies_voisins = monnaies_voisins.concat(voisins[j].currencies || []);
            }
        }

        let intersection = monnaies.filter(monnaie => monnaies_voisins.includes(monnaie));
        if (intersection.length === 0) {
            resultat.push(pays);
        }
    }
    console.table(resultat);
    console.log(resultat.length);
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