import React, {Component} from 'react';
import './App.css';

import ChartContainer from './components/ChartContainer.jsx';
import Stocks from './components/Stocks.jsx';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                    <ChartContainer/>
                    <Stocks/>
                </div>
            </div>
        );
    }
}

export default App;
