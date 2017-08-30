import React, {Component} from 'react';

import StockListContainer from './StockListContainer.jsx';
import StockControls from './StockControls.jsx';

export default class StockSection extends Component {
    render() {
        return (
            <div className="StockSection">
                <StockListContainer/>
                <StockControls/>
            </div>
        );
    }
}

StockSection.defaultProps = {};
