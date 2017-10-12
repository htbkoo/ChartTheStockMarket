import '../stylesheets/StockList.css';

import React, {Component} from 'react';
import propTypes from 'prop-types';
import {List} from 'immutable';
import StocksModel from "./model/StocksModel";

export default class StockList extends Component {
    render() {
        return (
            <div className="StockListContainer">
                {this.props.stocksModel.asSortableComponents({
                    onSortEnd: ({oldIndex, newIndex}) => this.props.onReorderStock(oldIndex, newIndex),
                    onRemoveStock: this.props.onRemoveStock
                })}
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
