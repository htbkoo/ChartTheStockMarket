import React, {Component} from 'react';
import {connect} from 'react-redux';

export class StockControls extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            inputValue: ""
        }
    }

    handleChange(e) {
        this.setState({inputValue: e.target.value});
    }

    render() {
        return (
            <div className="StockControls">
                <input type="text"
                       value={this.state.inputValue}
                       onChange={this.handleChange}/>
                />
            </div>
        );
    }
}

const StockControlsContainer = connect()(StockControls);
export default StockControlsContainer;

StockControls.defaultProps = {};
