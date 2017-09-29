import {connect} from 'react-redux';
import * as actions from '../redux/reduxActions';
import stringHelper from '../utils/stringHelper';
import StockList from './StockList';

const mapStateToProps = state => ({
    "stocks": state.get("stocks")
});

export const mapDispatchToProps = dispatch => [
    "onRemoveStock",
    "onReorderStock"
].reduce((obj, listenerName) => {
    obj[listenerName] = (...params) => dispatchWithLogging(listenerName, dispatch, params);
    return obj;
}, {});

const StockListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StockList);

export default StockListContainer;

function dispatchWithLogging(listenerName, dispatch, params) {
    let actionsKey = stringHelper.convert.forReduxActions(listenerName);
    console.log(`${listenerName} called with: ${params}, thus creating actions[${actionsKey}](${params})`);
    return dispatch(actions[actionsKey].apply(this, params));
}