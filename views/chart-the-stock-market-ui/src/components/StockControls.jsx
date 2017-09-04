import React, {Component} from 'react';
import {connect} from 'react-redux';

export class StockControls extends Component {
    render() {
        return (
            <div className="StockControls">
                <input type="text"/>
            </div>
        );
    }
}

const StockControlsContainer = connect()(StockControls);
export default StockControlsContainer;

StockControls.defaultProps = {};
