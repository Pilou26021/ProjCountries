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
            if (countries[i].area === undefined) {
                countries[i].area = 0;
            }
            const country = new Country(countries[i].alpha3Code, countries[i].name, countries[i].capital, countries[i].region, countries[i].population, countries[i].area, countries[i].borders, countries[i].demonym, countries[i].currencies, countries[i].languages, countries[i].topLevelDomain, countries[i].flags.svg, countries[i].translations);
            Country.all_countries.push(country);
        }
    }

    static getCountryByAlpha3Code(alpha3Code) {
        return Country.all_countries.find(country => country.alpha3Code === alpha3Code);
    }

    getCountryNameBorder() {
        const countries = [];
        if (this.borders === undefined || this.borders.length === 0) {
            return 'Aucun pays frontalier';
        }
        else {
            for (let i = 0; i < this.borders.length; i++) {
                const country = Country.getCountryByAlpha3Code(this.borders[i]);
                if (country) {
                    countries.push(' ' + country.name );
                }
            }
        }
        return countries;
    }

    getPopDensity() {
        if (this.area === 0) {
            return 0;
        }
        return this.population / this.area;
    }

    getBorders() {
        return this.borders;
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

    getTLDsNames() {
        return this.topLevelDomains.map(tld => {
            return tld;
        });
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