import React, {Component} from 'react';
import propTypes from 'prop-types';
import {SortableContainer} from 'react-sortable-hoc';

export default class SortableList extends Component {
    render() {
        return React.createElement(SortableContainer(() => this.props.children), this.props);
    }
}

SortableList.propTypes = {
    children: propTypes.element.isRequired
};