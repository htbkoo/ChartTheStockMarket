import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import ChartContainer from 'components/ChartContainer.jsx';

import Chart from 'components/Chart.jsx';
import ChartControl from 'components/ChartControl.jsx';

describe("ChartContainer", function () {
    it('should have a <Chart/> and <ChartControl/> in <ChartContainer/>', () => {
        // given

        // when
        let wrapper = shallow(<ChartContainer/>);

        // then
        chai.expect(wrapper.containsAllMatchingElements([
            <Chart/>,
            <ChartControl/>,
        ])).to.be.true;
    });
});
