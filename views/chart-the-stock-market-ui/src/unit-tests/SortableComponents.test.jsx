import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import {SortableList, SortableItem} from '../components/SortableComponents.jsx';

describe("SortableComponents", function () {
    describe("SortableList", function () {
        it('should render <SortableList><div/></SortableList>> without mocking SortableContainer', () => {
            // given
            let children = <div/>;

            // when
            let wrapper = shallow(<SortableList>{children}</SortableList>);

            // then
            chai.expect(wrapper).to.contain(children);
            chai.expect(wrapper).to.not.have.prop('withRef');
            assertIsSortableList(wrapper);
        });

        it('should render <SortableList withRef={true}><div/></SortableList>> and the props should be passed down', () => {
            // given
            let children = <span/>;

            // when
            let wrapper = shallow(<SortableList withRef={true}>{children}</SortableList>);

            // then
            chai.expect(wrapper).to.contain(children);
            chai.expect(wrapper).to.have.prop('withRef').that.equal(true);
            assertIsSortableList(wrapper);
        });

        function assertIsSortableList(wrapper) {
            const SORTABLE_LIST_ATTRIBUTES = ["axis", "transitionDuration", "pressDelay", "pressThreshold", "distance", "useWindowAsScrollContainer", "hideSortableGhost", "lockToContainerEdges", "lockOffset"];
            SORTABLE_LIST_ATTRIBUTES.forEach(attribute => chai.expect(wrapper).to.have.prop(attribute));
        }
    });

    describe("SortableItem", function () {
        it('should render <SortableItem><div/></SortableItem> without mocking SortableContainer', () => {
            // given
            let children = <div/>;

            // when
            let wrapper = shallow(<SortableItem key="item-0" index={0}>{children}</SortableItem>);

            // then
            chai.expect(wrapper).to.contain(children);
            chai.expect(wrapper).to.not.have.prop('withRef');
            assertIsSortableItem(wrapper);
        });

        function assertIsSortableItem(wrapper) {
            // TODO: to improve
            const SORTABLE_ITEM_ATTRIBUTES = ["collection"];
            SORTABLE_ITEM_ATTRIBUTES.forEach(attribute => chai.expect(wrapper).to.have.prop(attribute));
        }
    });
});
