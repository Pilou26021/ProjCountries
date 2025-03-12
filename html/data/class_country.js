class Country {
    static allCountries = [];

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

        this.translations = translations //tableau de traductions du nom
    }

    static fillCountries(countries) {
        for (let i = 0; i < countries.length; i++) {
            const country = new Country(countries[i].alpha3Code, countries[i].name, countries[i].capital, countries[i].continent, countries[i].population, countries[i].area, countries[i].borders, countries[i].demonym, countries[i].currencies, countries[i].languages, countries[i].topLevelDomain, countries[i].flags.svg, countries[i].translations);
            Country.allCountries.push(country);
        }
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
            return Country.allCountries.find(country => country.alpha3Code === borderCode);
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



// Example usage:
const countriestest = [
    {
       "name": "Afghanistan",
       "topLevelDomain": [
          ".af"
       ],
       "alpha2Code": "AF",
       "alpha3Code": "AFG",
       "callingCodes": [
          "93"
       ],
       "capital": "Kabul",
       "altSpellings": [
          "AF",
          "Afġānistān"
       ],
       "subregion": "Southern Asia",
       "region": "Asia",
       "population": 40218234,
       "latlng": [
          33.0,
          65.0
       ],
       "demonym": "Afghan",
       "area": 652230.0,
       "timezones": [
          "UTC+04:30"
       ],
       "borders": [
          "IRN",
          "PAK",
          "TKM",
          "UZB",
          "TJK",
          "CHN"
       ],
       "nativeName": "افغانستان",
       "numericCode": "004",
       "flags": {
          "svg": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
          "png": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png"
       },
       "currencies": [
          {
             "code": "AFN",
             "name": "Afghan afghani",
             "symbol": "؋"
          }
       ],
       "languages": [
          {
             "iso639_1": "ps",
             "iso639_2": "pus",
             "name": "Pashto",
             "nativeName": "پښتو"
          },
          {
             "iso639_1": "uz",
             "iso639_2": "uzb",
             "name": "Uzbek",
             "nativeName": "Oʻzbek"
          },
          {
             "iso639_1": "tk",
             "iso639_2": "tuk",
             "name": "Turkmen",
             "nativeName": "Türkmen"
          }
       ],
       "translations": {
          "br": "Afghanistan",
          "pt": "Afeganistão",
          "nl": "Afghanistan",
          "hr": "Afganistan",
          "fa": "افغانستان",
          "de": "Afghanistan",
          "es": "Afganistán",
          "fr": "Afghanistan",
          "ja": "アフガニスタン",
          "it": "Afghanistan",
          "hu": "Afganisztán"
       },
       "flag": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
       "regionalBlocs": [
          {
             "acronym": "SAARC",
             "name": "South Asian Association for Regional Cooperation"
          }
       ],
       "cioc": "AFG",
       "independent": true
    }];

//instancier un objet Country
const countrytest = new Country(countriestest[0].alpha3Code, countriestest[0].name, countriestest[0].capital, countriestest[0].subregion, countriestest[0].population, countriestest[0].area, countriestest[0].borders, countriestest[0].demonym, countriestest[0].currencies, countriestest[0].languages, countriestest[0].topLevelDomain, countriestest[0].flags.svg, countriestest[0].translations);

console.log(countrytest.toString()); // Output: AFG, Afghanistan, Kabul, Southern Asia, 40,218,234 hab, (IRN, PAK, TKM, UZB, TJK, CHN)
