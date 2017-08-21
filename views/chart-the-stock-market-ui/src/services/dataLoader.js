import externalStocksDataProvider from './externalStocksDataProvider';

export default {
    load() {
        return externalStocksDataProvider.fetch();
    }
}