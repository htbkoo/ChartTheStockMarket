import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as reactSortableHoc from 'react-sortable-hoc';

const SORTABLE_COMPONENT_FACTORY = {
    "create": [
        "SortableContainer",
        "SortableElement"
    ].reduce((prev, curr) => {
        prev[curr] = (props) => React.createElement(reactSortableHoc[curr](() => props.children), props);
        return prev;
    }, {})
};

export class SortableList extends Component {
    render() {
        return SORTABLE_COMPONENT_FACTORY.create.SortableContainer(this.props);
    }
}

SortableList.propTypes = {
    children: propTypes.element.isRequired
};

export class SortableItem extends Component {
    render() {
        return SORTABLE_COMPONENT_FACTORY.create.SortableElement(this.props);
    }
}

SortableItem.propTypes = {
    children: propTypes.element.isRequired
};