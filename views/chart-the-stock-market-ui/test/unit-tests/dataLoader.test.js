import chai from "chai";
import sinon from "../test-util/sinonWithSinonTest";

import dataLoader from "services/dataLoader";

import envVarRetriever from "services/envVarRetriever";
import externalStocksDataProvider from "services/externalStocksDataProvider";
import mockStocksDataProvider from "services/mockStocksDataProvider";

describe("dataLoader", function () {
    let ENV_VAR_KEY = {USE_MOCK_DATA_KEY: "REACT_APP_USE_MOCK_DATA"};

    it("should load from externalStocksDataProvider.fetch() if envVarRetriever.retrieve(REACT_APP_USE_MOCK_DATA) return false", sinon.test(function () {
        //    given
        this.stub(envVarRetriever, "retrieve").withArgs(ENV_VAR_KEY.USE_MOCK_DATA_KEY).returns(false);

        let stockData = {someKey: "someData"};
        this.stub(externalStocksDataProvider, "fetch").returns(Promise.resolve(stockData));
        this.stub(mockStocksDataProvider, "fetch").throws(new Error("Should not fetch from mockData"));

        //    when
        let data = dataLoader.load();

        //    then
        return data.then(response => chai.expect(response).to.deep.equal(stockData));
    }));

    it("should load from mockStocksDataProvider if envVarRetriever.retrieve(REACT_APP_USE_MOCK_DATA) return true", sinon.test(function () {
        //    given
        this.stub(envVarRetriever, "retrieve").withArgs(ENV_VAR_KEY.USE_MOCK_DATA_KEY).returns(true);

        let stockData = {someKey: "someData"};
        this.stub(externalStocksDataProvider, "fetch").throws(new Error("Should not fetch from externalData"));
        this.stub(mockStocksDataProvider, "fetch").returns(Promise.resolve(stockData));

        //    when
        let data = dataLoader.load();

        //    then
        return data.then(response => chai.expect(response).to.deep.equal(stockData));
    }));
});