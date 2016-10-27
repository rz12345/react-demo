import React, {Component} from 'react'
import OrderMenuCategory from '../../containers/Order/OrderMenuCategory'
import OrderMenuItem from '../../containers/Order/OrderMenuItem'
import OrderMenuPager from '../../containers/Order/OrderMenuPager'

const OrderMenu = () => (
    <div className="menu col-md-6 center-container">
        <OrderMenuCategory/>
        <OrderMenuItem/>
        <OrderMenuPager/>
    </div>
)

export default OrderMenu
