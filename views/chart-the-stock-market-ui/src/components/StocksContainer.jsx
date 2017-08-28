import {connect} from 'react-redux';
import * as actions from '../redux/reduxActions';
import Stocks from './Stocks';

const mapStateToProps = state => ({
    "stocks": state.stocks
});

export const mapDispatchToProps = dispatch => ({
    "onAddStock": underlyingId => {
        console.log("onAddStock called with: " + underlyingId);
        dispatch(actions.addStock(underlyingId));
    }
});

const StocksContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Stocks);

export default StocksContainer;