import {connect} from 'react-redux';
import * as actions from '../redux/reduxActions';
import StockList from './StockList';

const mapStateToProps = state => ({
    "stocks": state.get("stocks")
});

export const mapDispatchToProps = dispatch => ({
    "onRemoveStock": underlyingId => {
        console.log("onRemoveStock called with: " + underlyingId);
        dispatch(actions.removeStock(underlyingId));
    }
});

const StockListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StockList);

export default StockListContainer;