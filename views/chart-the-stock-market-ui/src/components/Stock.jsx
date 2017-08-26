import React, {Component} from 'react';

export default class Stock extends Component {
    render() {
        return (
            <div className="Stock">
                {this.props.stock}
            </div>
        );
    }
}