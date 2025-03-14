class Country {
    static all_countries = [];

    constructor(alpha3Code, name, capital, continent, population, area, borders, demonym, currencies, languages, topLevelDomains, flag, translations) {
        this.alpha3Code      = alpha3Code;
        this.name            = name;            // Depuis la "translations": fr
        this.capital         = capital;         // Capitale
        this.continent       = continent;       // Continent
        this.population      = population;      // Population
        this.area            = area;            // Superficie
        this.borders         = borders;         // Array de alpha3Codes
        this.demonym         = demonym;         // Nom des habitants
        this.currencies      = currencies;      // Array des codes de devises
        this.languages       = languages;       // Array de codes iso639_2
        this.topLevelDomains = topLevelDomains; // Array des TLDs
        this.flag            = flag;            // URL du drapeau en SVG
        this.translations    = translations;    //tableau de traductions du nom
    }

    static fill_countries(countries) {
        for (let i = 0; i < countries.length; i++) {
            const country = new Country(countries[i].alpha3Code, countries[i].name, countries[i].capital, countries[i].continent, countries[i].population, countries[i].area, countries[i].borders, countries[i].demonym, countries[i].currencies, countries[i].languages, countries[i].topLevelDomain, countries[i].flags.svg, countries[i].translations);
            Country.all_countries.push(country);
        }
    }

    static getCountryByAlpha3Code(alpha3Code) {
        return Country.all_countries.find(country => country.alpha3Code === alpha3Code);
    }

    get getNameFrFromTranslation() {
        return this.translations.fr;
    }

    get getAlpha3Code() {
        return this.alpha3Code;
    }

    set setAlpha3Code(alpha3Code) {
        this.alpha3Code = alpha3Code;
    }

    get getNames() {
        return this.translation
    }

    set setNames(names) {
        this.names = names;
    }

    get getCapital() {
        return this.capital;
    }

    set setCapital(capital) {
        this.capital = capital;
    }

    get getContinent() {
        return this.continent;
    }

    set setContinent(continent) {
        this.continent = continent;
    }

    get getPopulation() {
        return this.population;
    }

    set setPopulation(population) {
        this.population = population;
    }

    get getArea() {
        return this.area;
    }

    set setArea(area) {
        this.area = area;
    }

    get getBorders() {
        return this.borders;
    }

    set setBorders(borders) {
        this.borders = borders;
    }

    get getDemonym() {
        return this.demonym;
    }

    set setDemonym(demonym) {
        this.demonym = demonym;
    }

    get getCurrencies() {
        return this.currencies;
    }

    set setCurrencies(currencies) {
        this.currencies = currencies;
    }

    get getLanguages() {
        return this.languages;
    }

    set setLanguages(languages) {
        this.languages = languages;
    }

    get getTopLevelDomains() {
        return this.topLevelDomains;
    }

    set setTopLevelDomains(topLevelDomains) {
        this.topLevelDomains = topLevelDomains;
    }

    get getFlag() {
        return this.flag;
    }

    set setFlag(flag) {
        this.flag = flag;
    }

    getPopDensity() {
        return this.population / this.area;
    }

    getBorders() {
        return this.borders.map(borderCode => {
            return Country.all_countries.find(country => country.alpha3Code === borderCode);
        });
    }

    getCurrencies() {
        return this.currencies.map(currency => {
            return currency.name;
        });
    }

    getLanguages() {
        return this.languages.map(language => {
            return language.name;
        });
    }

    alpha3CodeToName(alpha3Code) {
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].alpha3Code === alpha3Code) {
                return countries[i].translations.fr;
            }
        }
    }

    toString() {
        const borderNames = this.borders.join(', ');
        let res;
        res = `${this.alpha3Code}, ${this.getNameFrFromTranslation}, ${this.capital}, ${this.continent}, ${this.population.toLocaleString()} hab, (`;
        for (let i = 0; i < this.borders.length; i++) {
            res += this.alpha3CodeToName(this.borders[i]);
            if (i < this.borders.length - 1) {
                res += ', ';
            }
        }
        res += ')';
        return res;
    }

}

Country.fill_countries(countries);