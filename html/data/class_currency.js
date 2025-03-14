class Currency {
    static allCurrencies = [];    

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
        for (let i = 0; i < currencies.length; i++) {
            const currency = new Currency(currencies[i].code, currencies[i].name, currencies[i].symbol);
            Currency.all_currencies.push(currency);
        }
    }
}

Currency.fill_currencies();