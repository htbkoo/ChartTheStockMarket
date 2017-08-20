import React, {Component} from 'react';

import Stock from './Stock';

export default class Stocks extends Component {
    render() {
        let stockComponents = ('stocks' in this.props) ?
            this.props.stocks.map((stock, key) => (<Stock stock={stock} key={key}/>)) :
            "";

        return (
            <div className="StocksContainer">
                {stockComponents};
            </div>
        );
    }
}