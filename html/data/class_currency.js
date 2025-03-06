class Currency {
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
}

export default Currency;