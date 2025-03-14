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
        for (let i = 0; i < countries.length; i++) {
            for (let j = 0; j < countries[i].languages.length; j++) {
                const language = new Language(countries[i].languages[j].name, countries[i].languages[j].iso639_2);
                Language.all_languages[countries[i].languages[j].iso639_2] = language;
            }
        }
    }
}

Language.fill_languages();