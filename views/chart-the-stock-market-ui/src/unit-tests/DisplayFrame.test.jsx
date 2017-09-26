import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import DisplayFrame from '../components/DisplayFrame.jsx';

describe("DisplayFrame", function () {
    it('should have child <div>{props.child}</div>', () => {
        // given
        let child = (
            <ul>
                <ul/>
            </ul>
        );

        // when
        let displayFrameComponent = shallow(<DisplayFrame child={child}/>);
        let div = displayFrameComponent.find('div');

        // then
        chai.expect(div).to.contain(child);
    });

    it('should have className=props.className on <div/>', () => {
        // given

        // when
        let displayFrameComponent = shallow(<DisplayFrame className="someFrame"/>);
        let div = displayFrameComponent.find('div');

        // then
        chai.expect(div).to.have.prop("className", "someFrame");
    });
});
