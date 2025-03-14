function withCommonLanguage() {
    let countries = [];
    let languages = [];
    let neighbors = [];
    for (let i = 0; i < countries.length; i++) {
        for (let j = 0; j < countries[i].borders.length; j++) {
            if (countries[i].languages.includes(countries[i].borders[j].languages)) {
                neighbors.push(countries[i].borders[j]);
                languages.push(countries[i].borders[j].languages);
            }
        }
    }
    console.log(neighbors, languages);
}

function withoutCommonCurrency() {
    let countries = [];
    let neighbors = [];
    for (let i = 0; i < countries.length; i++) {
        let commonCurrency = false;
        for (let j = 0; j < countries[i].borders.length; j++) {
            if (countries[i].currencies.includes(countries[i].borders[j].currencies)) {
                commonCurrency = true;
            }
        }
        if (!commonCurrency) {
            neighbors.push(countries[i]);
        }
    }
    console.log(neighbors);
}

function sortingDecreasingDensity() {
    let countries = [];
    return countries.sort((a, b) => b.population / b.area - a.population / a.area);
}

function moreTopLevelDomains() {
    let countries = [];
    let domains = [];
    for (let i = 0; i < countries.length; i++) {
        if (countries[i].topLevelDomain.length > 1) {
            domains.push(countries[i]);
        }
    }
    console.log(domains);
}