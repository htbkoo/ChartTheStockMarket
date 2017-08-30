import React, {Component} from 'react';

export default class Stock extends Component {
    render() {
        return (
            <li className="Stock">
                {this.props.stock}
            </li>
        );
    }
}