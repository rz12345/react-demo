import React, {Component} from 'react'
import OrderMenuCategory from '../containers/OrderMenuCategory'
import OrderMenuItem from '../containers/OrderMenuItem'
import OrderMenuPager from '../containers/OrderMenuPager'

const OrderMenu = () => (
    <div className="menu col-md-6 center-container">
        <OrderMenuCategory/>
        <OrderMenuItem/>
        <OrderMenuPager/>
    </div>
)

export default OrderMenu
