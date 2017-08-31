import React, {Component} from 'react';
import './stylesheets/App.css';

import ChartContainer from './components/ChartContainer.jsx';
import StockSection from './components/StockSection.jsx';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="AppContainer">
                    <ChartContainer/>
                    <StockSection/>
                </div>
            </div>
        );
    }
}

export default App;
