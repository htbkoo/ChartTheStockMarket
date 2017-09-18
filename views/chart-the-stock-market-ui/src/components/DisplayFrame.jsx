import React, {Component} from 'react';

export default class Frame extends Component {
    render() {
        return (
            <div>
                {this.props.child}
            </div>
        );
    }
}