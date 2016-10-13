import React, {Component} from 'react';
import OrderConstants from '../constants/OrderConstants';
import OrderMenuCategoryList from './OrderMenuCategoryList.jsx'
import OrderMenuItemList from './OrderMenuItemList.jsx'
import OrderMenuPager from './OrderMenuPager.jsx'

class OrderMenu extends Component {
    updateMenu(categoryId, pageId) {
        const items = this.props.items.filter((record) => {
            return record.category_id == categoryId;
        }).filter((record, i) => {
            return OrderConstants.itemsPerPageAmount * pageId <= i && i < OrderConstants.itemsPerPageAmount * (1 + pageId);
        });
        this.setState({items: items, categoryId: categoryId});
    }

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            categoryId: null,
            currentPage: null
        };
        this.updateMenu = this.updateMenu.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories.length > 0 && this.state.categoryId === null) {
            // set default category && menu page
            const categoryId = nextProps.categories[0].id
            const currentPage = 0;
            this.setState({selectedCategory: categoryId, currentPage: currentPage});

            // refresh menu item
            this.updateMenu(categoryId, currentPage);
        }
    }

    render() {
        return (
            <div className="menu col-md-6 center-container">
                <OrderMenuCategoryList categories={this.props.categories} categoryId={this.state.categoryId} updateMenu={this.updateMenu}/>
                <OrderMenuItemList items={this.state.items} updateOrder={this.props.updateOrder}/>
                <OrderMenuPager items={this.props.items} categoryId={this.state.categoryId} updateMenu={this.updateMenu}/>
            </div>
        );
    }
}

export default OrderMenu;
