import chai from "chai";
import sinon from "../test-util/sinonWithSinonTest";

import dataLoader from "../services/dataLoader";

import externalStocksDataProvider from "../services/externalStocksDataProvider";

describe("dataLoader", function () {
    it("should try to load from externalStocksDataProvider if envVarRetriever.retrieve(REACT_APP_USE_MOCK_DATA) return false", sinon.test(function () {
        //    given
        let stockData = {someKey: "someData"};
        this.stub(externalStocksDataProvider, "fetch").returns(Promise.resolve(stockData));

        //    when
        let data = dataLoader.load();

        //    then
        return data.then(response => chai.expect(response).to.deep.equal(stockData));
    }));
});