import React, {Component, PropTypes} from 'react'
import {getOrderContentStyle} from '../../helpers'
import OrderContentDetail from '../../containers/Order/OrderContentDetail'
import OrderContentSubmit from '../../containers/Order/OrderContentSubmit'

class OrderContent extends Component {
    componentDidMount() {
        // item 動態列高
        const {updateOrderStyle} = this.props
        updateOrderStyle(getOrderContentStyle())
        window.addEventListener('resize', () => updateOrderStyle(getOrderContentStyle()))
    }

    componentWillUnmount() {
        const {updateOrderStyle} = this.props
        window.removeEventListener('resize', () => updateOrderStyle(getOrderContentStyle()))
    }

    render() {
        const {orderContentStyle} = this.props
        return (
            <div className="content col-md-6 center-container">
                <div className="panel panel-default center-container">
                    <div className="panel-heading">點單明細</div>
                    <div className="panel-body" style={orderContentStyle}>
                        <div className="order-details">
                            <OrderContentDetail/>
                        </div>
                        <div className="order-submit">
                            <OrderContentSubmit/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
OrderContent.propTypes = {
    orderContentStyle: PropTypes.object.isRequired,
    updateOrderStyle: PropTypes.func.isRequired
}

export default OrderContent
