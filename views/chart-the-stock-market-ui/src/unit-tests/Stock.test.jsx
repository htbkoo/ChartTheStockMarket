import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import Stock from '../components/Stock.jsx';

describe("Stock", function () {
    it('should have child <li>{props.stock}</li>', () => {
        // given
        let stock = "stock";

        // when
        let stockComponent = shallow(<Stock stock={stock}/>);
        let li = stockComponent.find('li');

        // then
        chai.expect(li).to.have.text(stock);
    });
});
