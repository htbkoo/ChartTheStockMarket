import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import Stock from 'src/components/Stock.jsx';

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

    it('should have child <button onClick={this.props.onRemoveStock}> ', () => {
        return new Promise(resolve => {
            // given
            let stock = "stock", isClicking = false;
            let mockOnRemoveStock = stockId => {
                chai.expect(isClicking).to.equal(true, "should be triggered by click");
                chai.expect(stockId).to.equal(stock);
                resolve();
            };

            // when
            let stockComponent = shallow(<Stock stock={stock} onRemoveStock={mockOnRemoveStock}/>);
            let buttonComponent = stockComponent.find('button');

            // then
            chai.expect(buttonComponent).to.have.length(1);
            chai.expect(buttonComponent).to.have.className("close");

            isClicking = true;
            buttonComponent.simulate('click');
        })
    });
});
