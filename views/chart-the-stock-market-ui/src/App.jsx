import React, {Component} from 'react';
import './App.css';

import ChartContainer from './components/ChartContainer.jsx';
import StockListContainer from './components/StockListContainer.jsx';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="AppContainer">
                    <ChartContainer/>
                    <StockListContainer/>
                </div>
            </div>
        );
    }
}

export default App;
