import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import Stock from '../components/Stock.jsx';

describe("Stock", function () {
    it('should have child <div class="StockText">{props.stock}</div>', () => {
        // given
        let stock = "stock";

        // when
        let stockComponent = shallow(<Stock stock={stock}/>);
        let div_StockText = stockComponent.find('div.StockText');

        // then
        chai.expect(div_StockText).to.have.text(stock);
    });

    it('should have child <button class="close"> ', () => {
        // given
        let mockOnRemoveStock = "mock";

        // when
        let stockComponent = shallow(<Stock onRemoveStock={mockOnRemoveStock}/>);
        let buttonComponent = stockComponent.find('button');

        // then
        chai.expect(buttonComponent).to.have.length(1);
        chai.expect(buttonComponent).to.have.className("close");
    });
});
