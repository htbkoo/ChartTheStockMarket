import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import Stock from '../components/Stock.jsx';

describe("Stock", function () {
    it('should have props.stock as the text children', () => {
        // given
        let stock = "stock";

        // when
        let stockComponent = shallow(<Stock stock={stock}/>);

        // then
        chai.expect(stockComponent).to.have.text(stock);
    });
});
