class Language {
    static all_languages = {};

    constructor(name, iso639_2) {
        this.name = name;
        this.iso639_2 = iso639_2;
    }

    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }

    get getIso639_2() {
        return this.iso639_2;
    }
    set setIso639_2(iso639_2) {
        this.iso639_2 = iso639_2;
    }

    toString() {
        return this.name + ' (' + this.iso639_2 + ')';
    }

    static fill_languages() {
        for (let i = 0; i < languages.length; i++) {
            const language = new Language(languages[i].name, languages[i].iso639_2);
            Language.all_languages[languages[i].iso639_2] = language;
        }
    }

    static fillCountries(countries) {
        for (let i = 0; i < countries.length; i++) {
            const country = new Country(countries[i].alpha3Code, countries[i].name, countries[i].capital, countries[i].continent, countries[i].population, countries[i].area, countries[i].borders, countries[i].demonym, countries[i].currencies, countries[i].languages, countries[i].topLevelDomain, countries[i].flags.svg, countries[i].translations);
            Country.allCountries.push(country);
        }
    }

}

Language.fill_languages();