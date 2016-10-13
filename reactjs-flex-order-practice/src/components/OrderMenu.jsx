import React, {Component} from 'react';
import OrderMenuCategoryList from './OrderMenuCategoryList.jsx'
import OrderMenuItemList from './OrderMenuItemList.jsx'
import OrderMenuPager from './OrderMenuPager.jsx'

// stateless component
const OrderMenu = () => (
    <div className="menu col-md-6 center-container">
        <OrderMenuCategoryList/>
        <OrderMenuItemList/>
        <OrderMenuPager/>
    </div>
);

export default OrderMenu;
