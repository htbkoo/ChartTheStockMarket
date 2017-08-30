import React, {Component} from 'react';

import Stock from './Stock';

export default class StockList extends Component {
    render() {
        let stockComponents = this.props.stocks.map((stock, key) => (<Stock stock={stock} key={key}/>));

        return (
            <ul className="StockListContainer">
                {stockComponents};
            </ul>
        );
    }
}

StockList.defaultProps = {
    stocks: []
};
