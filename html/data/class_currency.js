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

    static fillCurrencies() {
        countries.forEach(country => {
            if (country.currencies) {
                country.currencies.forEach(currency => {
                    const newCurrency = new Currency(currency.code, currency.name, currency.symbol);
                    Currency.all_currencies[currency.code] = newCurrency;
                });
            }
        });
    }
}

Currency.fillCurrencies();