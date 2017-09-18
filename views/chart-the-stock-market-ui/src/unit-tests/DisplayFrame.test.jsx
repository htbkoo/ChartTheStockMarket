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
        //TODO: confirm "containMatchingElement" is correct
        chai.expect(div).to.containMatchingElement(child);
    });
});
