import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import Stock from '../components/Stock.jsx';

describe("Stock", function () {
    it('should have child <div>{props.stock}</div>', () => {
        // given
        let stock = "stock";

        // when
        let stockComponent = shallow(<Stock stock={stock}/>);
        let div = stockComponent.find('div');

        // then
        chai.expect(div).to.have.text(stock);
    });
});
