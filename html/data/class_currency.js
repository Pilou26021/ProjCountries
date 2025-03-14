class Currency {
    static all_currencies = [];    

    constructor(code, name, symbol) {
        this.code = code;
        this.name = name;
        this.symbol = symbol;
    }

    getCode() {
        return this.code;
    }

    getName() {
        return this.name;
    }

    getSymbol() {
        return this.symbol;
    }

    setCode(code) {
        this.code = code;
    }

    setName(name) {
        this.name = name;
    }

    setSymbol(symbol) {
        this.symbol = symbol;
    }

    static fill_currencies() {
        for (let i = 0; i < countries.length; i++) {
            for (let j = 0; j < countries[i].currencies.length; j++) {
                const currency = new Currency(countries[i].currencies[j].code, countries[i].currencies[j].name, countries[i].currencies[j].symbol);
                Currency.all_currencies.push(currency);
            }
        }
    }
}

Currency.fill_currencies();