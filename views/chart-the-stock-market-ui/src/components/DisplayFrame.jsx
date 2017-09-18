import React, {Component} from 'react';

export default class Frame extends Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.child}
            </div>
        );
    }
}