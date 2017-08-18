import React, {Component} from 'react';

import Chart from './Chart.jsx';
import ChartControl from './ChartControl.jsx';

export default class ChartContainer extends Component {
    render() {
        return (
            <div className="ChartContainer">
                <Chart/>
                <ChartControl/>
            </div>
        );
    }
}