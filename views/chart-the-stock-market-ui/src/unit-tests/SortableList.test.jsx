import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import SortableList from '../components/SortableList.jsx';

describe("SortableList", function () {
    it('should render <SortableList><div/></SortableList>> without mocking SortableContainer', () => {
        // given
        let children = <div/>;

        // when
        let wrapper = shallow(<SortableList>{children}</SortableList>);

        // then
        chai.expect(wrapper).to.contain(children);
    });
});
