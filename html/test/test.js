//Q1 - outsideTheContinent() : Tableau JS des pays (objets Country) dont au moins un pays frontalier n’est pas dans le même continent.
function outsideTheContinent() {
    let countries = Country.all_countries;
    let countriesOutside = [];

    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        let borders = country.getBorders();
        let continent = country.continent;
        if (!borders || borders.length === 0) {
            continue;
        }
        for (let j = 0; j < borders.length; j++) {
            let border = borders[j];
            let countryBorder = Country.getCountryByAlpha3Code(border);
            if (countryBorder.continent !== continent) {
                countriesOutside.push(country);
                break;
            }
        }
    }
    return countriesOutside;
}

// console.log("Test Q1");
// console.table(outsideTheContinent());

//Q2 - moreNeighbors() : Tableau des pays ayant le plus grand nombre de voisins. Achez aussi les voisins.
function moreNeighbors() {
    let countries = Country.all_countries;
    let countriesMoreNeighbors = [];
    let max = 0;
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        let borders = country.borders;
        if (!borders || borders.length === 0) {
            continue;
        }
        if (borders.length > max) {
            max = borders.length;
            countriesMoreNeighbors = [];
            countriesMoreNeighbors.push(country);
        } else if (borders.length === max) {
            countriesMoreNeighbors.push(country);
        }
    }
    return countriesMoreNeighbors;
}

// console.log("Test Q2 : ");
// console.table(moreNeighbors());
// for (let i = 0; i < moreNeighbors().length; i++) {
//     for (let j = 0; j < moreNeighbors()[i].borders.length; j++) {
//         console.log(Country.getCountryByAlpha3Code(moreNeighbors()[i].borders[j]).name);
//     }
// }

//Q3 - neighborless() : Tableau des pays n’ayant aucun voisin.
function neighborless() {
    let countries = Country.all_countries;
    let countriesNeighborless = [];
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        let borders = country.borders;
        if (!borders || country.borders.length === 0) {
            countriesNeighborless.push(country);
        }
    }
    return countriesNeighborless;
}


// console.log("Test Q3 : ");
// console.table(neighborless());


//Q4 - moreLanguages() : Tableau des pays parlant le plus de langues. Achez aussi les langues (objets Language).
function moreLanguages() {
    let countries = Country.all_countries;
    let languages = Language.all_languages;
    let countriesMoreLanguages = [];
    let max = 0;
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        let countryLanguages = country.languages;
        if (countryLanguages.length > max) {
            max = countryLanguages.length;
            countriesMoreLanguages = [];
            countriesMoreLanguages.push(country);
        } else if (countryLanguages.length === max) {
            countriesMoreLanguages.push(country);
        }
    }
    return countriesMoreLanguages;
}

console.log("Test Q4 : ");
console.table(moreLanguages());
for (let i = 0; i < moreLanguages().length; i++) {
    for (let j = 0; j < moreLanguages()[i].languages.length; j++) {
        console.log(Language.all_languages[moreLanguages()[i].languages[j].iso639_2].name);
    }
}

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