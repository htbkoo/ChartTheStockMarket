import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import DisplayFrame from '../components/DisplayFrame.jsx';

describe("DisplayFrame", function () {
    it('should have children <div>{props.children}</div>', () => {
        // given
        let children = (
            <ul>
                <li/>
            </ul>
        );

        // when
        let displayFrameComponent = shallow(<DisplayFrame children={children}/>);
        let div = displayFrameComponent.find('div');

        // then
        chai.expect(div).to.contain(children);
    });

    it('should be able to render with alternative form of children in <DisplayFrame />', () => {
        // given
        let children = (
            <ul>
                <li/>
            </ul>
        );

        // when
        let displayFrameComponent = shallow(<DisplayFrame>{children}</DisplayFrame>);
        let div = displayFrameComponent.find('div');

        // then
        chai.expect(div).to.contain(children);
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
