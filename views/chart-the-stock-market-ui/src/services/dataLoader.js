import envVarRetriever from './envVarRetriever';
import externalStocksDataProvider from './externalStocksDataProvider';
import mockStocksDataProvider from './mockStocksDataProvider';

let USE_MOCK_DATA_KEY = "REACT_APP_USE_MOCK_DATA";

export default {
    load() {
        if (envVarRetriever.retrieve(USE_MOCK_DATA_KEY)) {
            return mockStocksDataProvider.fetch();
        } else {
            return externalStocksDataProvider.fetch();
        }
    }
}