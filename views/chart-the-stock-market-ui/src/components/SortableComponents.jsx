import React, {Component} from 'react';
import propTypes from 'prop-types';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

export class SortableList extends Component {
    render() {
        return React.createElement(SortableContainer(() => this.props.children), this.props);
    }
}

SortableList.propTypes = {
    children: propTypes.element.isRequired
};

export class SortableItem extends Component {
    render() {
        return React.createElement(SortableElement(() => this.props.children), this.props);
    }
}

SortableItem.propTypes = {
    children: propTypes.element.isRequired
};