import configureStore from 'redux-mock-store';
import {Map} from 'immutable';

export default {
    "createEmptyStore"() {
        return configureStore()(Map());
    }
}