import {
    connect
} from 'react-redux'
import {updateOrderStyle} from '../../actions/ui/Order/order'
import OrderContent from '../../components/Order/OrderContent.jsx'

function mapStateToProps(state) {
    return {
        orderContentStyle: state.order.orderContentStyle
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateOrderStyle: (style) => dispatch(updateOrderStyle(style))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderContent)
