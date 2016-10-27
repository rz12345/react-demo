import {
    connect
} from 'react-redux'
import {
    removeItemFromOrder,
    removeAdditionFromOrder,
    updateAddition
} from '../../actions/ui/Order/order'
import OrderContentDetail from '../../components/Order/OrderContentDetail.jsx'

function mapStateToProps(state) {
    return {
        items: state.order.items,
        additions: state.order.additions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeItemFromOrder: (item) => dispatch(removeItemFromOrder(item)),
        removeAdditionFromOrder: (addition) => dispatch(removeAdditionFromOrder(addition)),
        updateAddition: (addition) => dispatch(updateAddition(addition))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContentDetail)
