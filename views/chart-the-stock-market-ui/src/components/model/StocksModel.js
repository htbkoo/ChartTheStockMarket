import React, {Component} from 'react';
import {List} from 'immutable';
import {SortableItem, SortableList} from '../SortableComponents';
import DisplayFrame from '../DisplayFrame';
import Stock from '../Stock';

export default class StocksModel {
    constructor(stocks = List()) {
        let _stocks;
        setStocks(stocks);

        this.getStocks = () => {
            return _stocks;
        };

        this.setStocks = setStocks;

        function setStocks(stocks) {
            if (List.isList(stocks)) {
                _stocks = stocks;
            } else {
                throw new TypeError("Passed in stocks should be an immutable.List")
            }
        }
    }

    asSortableComponents(props) {
        let stocks = this.getStocks();

        return (
            <SortableList axis="x" onSortEnd={props.onSortEnd}>
                <div className="StockListContainer">
                    {stocks.map((stock, index) => (
                        <SortableItem key={`item-${index}`} index={index}>
                            <DisplayFrame className="StockDisplayFrame" key={index}>
                                <Stock stock={stock} onRemoveStock={props.onRemoveStock}/>
                            </DisplayFrame>
                        </SortableItem>
                    ))}
                </div>
            </SortableList>
        );
    }
}