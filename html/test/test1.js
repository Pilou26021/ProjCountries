//Q1 - outsideTheContinent() : Tableau JS des pays (objets Country) dont au moins un pays frontalier n’est pas dans le même continent.
function outsideTheContinent() {
    let countries = Country.all_countries;
    let countriesOutside = [];
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        let borders = country.getBorders();
        let continent = country.continent;
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

//outsideTheContinent();

//Q2 - moreNeighbors() : Tableau des pays ayant le plus grand nombre de voisins. Achez aussi les voisins.
function moreNeighbors() {
    let countries = Country.all_countries;
    let countriesMoreNeighbors = [];
    let max = 0;
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        let borders = country.borders;
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

//moreNeighbors();

//Q3 - neighborless() : Tableau des pays n’ayant aucun voisin.
function neighborless() {
    let countries = Country.all_countries;
    let countriesNeighborless = [];
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        if (country.borders.length === 0) {
            countriesNeighborless.push(country);
        }
    }
    return countriesNeighborless;
}

//neighborless();

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

//moreLanguages();