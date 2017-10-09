import {List} from 'immutable';

export default class StockModel {
    constructor() {
        let _stocks = List();
        this.getStocks = () => {
            return _stocks;
        };

        this.setStocks = (stocks) => {
            _stocks = stocks;
        }
    }
}