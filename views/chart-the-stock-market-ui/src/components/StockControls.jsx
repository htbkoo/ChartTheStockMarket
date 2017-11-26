import React, {Component} from 'react';
import {connect} from 'react-redux';
import keycodeHelper from '../utils/keycodeHelper';
import {actions} from "redux/reduxActions";

export class StockControls extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.state = {
            inputValue: ""
        }
    }

    handleChange(e) {
        this.setState({inputValue: e.target.value});
    }

    handleKeyUp(e) {
        if (keycodeHelper.checks.isEnter(e)) {
            if (this.state.inputValue.trim()) {
                this.props.dispatch(actions.addStock(this.state.inputValue));
                this.setState({
                    inputValue: ""
                });
            }
        }
    }

    render() {
        return (
            <div className="StockControls">
                <input type="text"
                       value={this.state.inputValue}
                       onChange={this.handleChange}
                       onKeyUp={this.handleKeyUp}/>
            </div>
        );
    }
}

const StockControlsContainer = connect()(StockControls);
export default StockControlsContainer;

StockControls.defaultProps = {};
