import {List} from 'immutable';

export default class StocksModel {
    constructor(stocks = List()) {
        let _stocks = stocks;

        this.getStocks = () => {
            return _stocks;
        };

        this.setStocks = stocks => {
            if (List.isList(stocks)) {
                _stocks = stocks;
            } else {
                throw new TypeError("Passed in stocks should be an immutable.List")
            }
        };
    }
}