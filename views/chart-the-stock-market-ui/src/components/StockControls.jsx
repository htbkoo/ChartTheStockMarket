import React, {Component} from 'react';
import {connect} from 'react-redux';
import keycodeHelper from '../utils/keycodeHelper';
import {addStock} from '../redux/reduxActions';

export class StockControls extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            inputValue: ""
        }
    }

    handleChange(e) {
        this.setState({inputValue: e.target.value});
    }

    handleKeyPress(e) {
        if (keycodeHelper.isEnter(e)) {
            if (this.state.inputValue.trim()) {
                this.props.dispatch(addStock(this.state.inputValue));
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
                       onKeyPress={this.handleKeyPress}/>
                />
            </div>
        );
    }
}

const StockControlsContainer = connect()(StockControls);
export default StockControlsContainer;

StockControls.defaultProps = {};
