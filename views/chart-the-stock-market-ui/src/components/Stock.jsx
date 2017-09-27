import React, {Component} from 'react';

export default class Stock extends Component {
    render() {
        return (
            <div className="Stock">
                <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="false">&times;</span>
                </button>
                <div className="StockText">
                    {this.props.stock}
                </div>
            </div>
        );
    }
}