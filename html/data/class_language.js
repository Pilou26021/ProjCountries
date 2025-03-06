class Language {
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

}

// Example usage:
// const english = new Language('English', 'English', 'en', 'eng');
// console.log(english.getName()); // Output: English