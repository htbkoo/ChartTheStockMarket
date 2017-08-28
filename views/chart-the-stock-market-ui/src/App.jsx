import React, {Component} from 'react';
import './App.css';

import ChartContainer from './components/ChartContainer.jsx';
import StocksContainer from './components/StocksContainer.jsx';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="AppContainer">
                    <ChartContainer/>
                    <StocksContainer/>
                </div>
            </div>
        );
    }
}

export default App;
