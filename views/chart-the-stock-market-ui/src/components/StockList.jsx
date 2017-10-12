import '../stylesheets/StockList.css';

import React, {Component} from 'react';
import propTypes from 'prop-types';
import {List} from 'immutable';

import Stock from './Stock';
import DisplayFrame from './DisplayFrame';
import StocksModel from "./model/StocksModel";

export default class StockList extends Component {
    render() {
        let stockComponents = this.props.stocksModel.getStocks().map((stock, key) => (
            <DisplayFrame className="StockDisplayFrame" key={key}>
                <Stock stock={stock} onRemoveStock={this.props.onRemoveStock}/>
            </DisplayFrame>
        ));

        return (
            <div className="StockListContainer">
                {stockComponents.toArray()}
            </div>
        );
    }
}

StockList.propTypes = {
    stocksModel: propTypes.instanceOf(StocksModel).isRequired
};

StockList.defaultProps = {
    stocksModel: new StocksModel(List())
};
