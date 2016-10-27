import {
    connect
} from 'react-redux'
import {
    addAdditionToOrder,
    toggleToGoStatus,
    toggleWhenStatus,
    sumbitOrder
} from '../../actions/ui/Order/order'
import OrderContentSubmit from '../../components/Order/OrderContentSubmit.jsx'

function mapStateToProps(state) {
    return {
        order: state.order.items,
        isToGo: state.order.isToGo,
        when: state.order.when,
        tables: state.tables.records,
        total: state.order.total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAdditionToOrder: () => dispatch(addAdditionToOrder()),
        toggleToGoStatus: () => dispatch(toggleToGoStatus()),
        toggleWhenStatus: () => dispatch(toggleWhenStatus()),
        sumbitOrder: () => dispatch(sumbitOrder())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderContentSubmit)
