class Stock {
    constructor(underlyingId) {
        if (typeof underlyingId === "undefined") {
            throw new TypeError("underlyingId must not be undefined")
        }

        this.getUnderlyingId = () => underlyingId;
    }

    asJson(){
        return {
            underlyingId: this.getUnderlyingId()
        };
    }
}

module.exports = Stock;