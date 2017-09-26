import React, {Component} from 'react';

import StockListContainer from './StockListContainer.jsx';
import StockControls from './StockControls.jsx';
import DisplayFrame from './DisplayFrame.jsx';

export default class StockSection extends Component {
    render() {
        return (
            <div className="StockSection">
                <StockListContainer/>
                <DisplayFrame className="StockDisplayFrame">
                    <StockControls/>
                </DisplayFrame>
            </div>
        );
    }
}

StockSection.defaultProps = {};
