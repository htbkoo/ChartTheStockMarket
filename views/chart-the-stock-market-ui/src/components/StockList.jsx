import React, {Component} from 'react';
import '../stylesheets/StockList.css';

import DisplayFrame from './DisplayFrame';

export default class StockList extends Component {
    render() {
        let stockComponents = this.props.stocks.map((stock, key) => (
            <DisplayFrame child={stock} className="StockDisplayFrame" key={key}/>
        ));

        return (
            <div className="StockListContainer">
                {stockComponents}
            </div>
        );
    }
}

StockList.defaultProps = {
    stocks: []
};
