class Language {
    static allLanguages = {};

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

    static fillLanguages() {
        countries.forEach(data => {
            data.languages.forEach(language => {
                let langue = new Language(
                    language.iso639_2,
                    language.name
                );
                Language.allLanguages[language.iso639_2] = langue;
            });
        });
    }

}

Language.fillLanguages();

// Example usage:
// const english = new Language('English', 'English', 'en', 'eng');
// console.log(english.getName()); // Output: English