import React from 'react'
import ReactDOM from 'react-dom'

// config
const API = require('./../configs/API');

// jsx components
const Spinner = require('./../components/Loading.jsx');
const MenuCategory = require('./../components/MenuCategory.jsx');
const MenuItem = require('./../components/MenuItem.jsx');
const MenuItemNav = require('./../components/MenuItemNav.jsx');
const OrderList = require('./../components/OrderList.jsx');

// js helper
const ArrayHelper = require('./../helpers/ArrayHelper');
const PaymentHelper = require('./../helpers/PaymentHelper');

class Order extends React.Component {
    // 切換顯示的 items
    updateItemsBy(updateFn) {
        return (...args) => {
            const {itemsPerPageAmount} = this.props;
            const itemsFiltered = updateFn(this.state.items, ...args);
            this.setState({
                itemsSelected: ArrayHelper.splitArray2D(itemsFiltered, itemsPerPageAmount)[0],
                itemsSplited: ArrayHelper.splitArray2D(itemsFiltered, itemsPerPageAmount),
                itemsPagesCount: Math.ceil(itemsFiltered.length / itemsPerPageAmount), // 有幾頁
                itemsCurrentPage: 0
            });
        };
    }

    // 切換 items 分頁
    updateItemsPageBy(updateFn) {
        return (idx) => {
            const itemsSelected = updateFn(this.state.itemsSplited, idx);
            this.setState({itemsSelected: itemsSelected, itemsCurrentPage: idx})
        };
    }

    // 更新 order
    updateOrderBy(updateFn) {
        return (...args) => {
            this.setState({
                orderFromMenu: updateFn(this.state.orderFromMenu, ...args)
            });
            // 一併更新 total
            let total = 0;
            this.state.orderFromMenu.map((el) => total += el.subtotal);
            this.setState({totalByOrder: total});
        };
    }

    // 更新 addition
    updateAdditionBy(updateFn) {
        //console.log('updateAdditionBy');
        return (...args) => {
            this.setState({
                orderFromAddition: updateFn(this.state.orderFromAddition, ...args)
            });
            // 一併更新 total
            let total = 0;
            this.state.orderFromAddition.map((el) => total += el.subtotal);
            this.setState({totalByAddition: total});
        };
    }

    // 清空 order
    clearOrder() {
        this.setState({orderFromMenu: [], orderFromAddition: [], totalByOrder: 0, totalByAddition: 0});
    }

    // 觸發 window resize 事件時, 重算 contentDivHeight
    handleResize(e) {
        const contentNode = ReactDOM.findDOMNode(this);
        const contentNodeHeight = contentNode.clientHeight;
        this.setState({contentDivHeight: contentNodeHeight});
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            orderFromMenu: [],
            orderFromAddition: [],
            categories: [],
            items: [],
            itemsSelected: [],
            totalByOrder: 0,
            totalByAddition: 0
        };
        this.handleResize = this.handleResize.bind(this);
        this.clearOrder = this.clearOrder.bind(this);
    }

    componentDidMount() {
        // 監聽 resize , 並觸發動作
        $(window).on('resize', this.handleResize);

        const {itemsPerPageAmount, defaultCategory} = this.props;

        // 抓取 categories
        fetch(API.get.category,{
            method: 'GET'
        }).then((response) => response.json()).then((categories) => this.setState({
            categories: categories.map((category) => category.name).filter((category) => category !== '其他')
        }));

        // 抓取 items
        fetch(API.get.item,{
            method: 'GET'
        }).then((response) => response.json()).then((items) => this.setState({
            items: items,
            itemsSelected: ArrayHelper.splitArray2D(PaymentHelper.getItemsByCategory(items, defaultCategory), itemsPerPageAmount)[0],
            itemsSplited: ArrayHelper.splitArray2D(PaymentHelper.getItemsByCategory(items, defaultCategory), itemsPerPageAmount),
            itemsPagesCount: Math.ceil(PaymentHelper.getItemsByCategory(items, defaultCategory).length / itemsPerPageAmount), // 有幾頁
            itemsCurrentPage: 0
        }));

        // 取得 div.content 高度
        const contentNode = ReactDOM.findDOMNode(this);
        const contentNodeHeight = contentNode.clientHeight;
        const panelHeadingNode = ReactDOM.findDOMNode(this.refs.panelHeading);
        const panelHeadingHeight = panelHeadingNode.clientHeight;
        this.setState({contentDivHeight: contentNodeHeight, panelHeadingHeight: panelHeadingHeight});
    }

    componentWillUnmount() {
        $(window).off('resize', this.handleResize);
    }

    render() {
        const {
            items,
            categories,
            itemsSelected,
            itemsPagesCount,
            itemsCurrentPage,
            orderFromMenu,
            orderFromAddition,
            totalByOrder,
            totalByAddition,
            contentDivHeight,
            panelHeadingHeight
        } = this.state;

        const props = {
            category: {
                categories: categories,
                onClickCategroy: this.updateItemsBy(PaymentHelper.getItemsByCategory)
            },
            items: {
                items: itemsSelected,
                onClickItem: this.updateOrderBy(PaymentHelper.addItemToOrder),
                contentDivHeight: contentDivHeight
            },
            nav: {
                pagesCount: itemsPagesCount,
                currentPage: itemsCurrentPage,
                onClickNav: this.updateItemsPageBy(PaymentHelper.getItemsByPage)
            },
            orderList: {
                order: orderFromMenu,
                addition: orderFromAddition,
                total: totalByOrder + totalByAddition,
                onClickItem: this.updateOrderBy(PaymentHelper.deleteItemFromOrder),
                onClickNewAddition: this.updateAdditionBy(PaymentHelper.addAdditionToOrder),
                onClickDeleteAddition: this.updateAdditionBy(PaymentHelper.deleteAdditionFromOrder),
                onUpdateAddition: this.updateAdditionBy(PaymentHelper.updateAddition),
                clearOrder: this.clearOrder,
                contentDivHeight: contentDivHeight,
                panelHeadingHeight: panelHeadingHeight
            }
        };

        return (
            <div className="order center-container">
                <div className="menu col-md-6 center-container">
                    <MenuCategory {...props.category}/>
                    <MenuItem {...props.items}/>
                    <MenuItemNav {...props.nav}/>
                    {items.length === 0 || categories.length === 0 ? <Spinner/>: ''}
                </div>
                <div className="content col-md-6 center-container">
                    <div className="panel panel-default center-container">
                        <div className="panel-heading" ref="panelHeading">點單明細</div>
                        <div className="panel-body">
                            <OrderList {...props.orderList}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Order.propTypes = {
    itemsPerPageAmount: React.PropTypes.number, // 是數字
    defaultCategory: React.PropTypes.string
};
Order.defaultProps = {
    itemsPerPageAmount: 12, // 每頁 items 數量
    defaultCategory: '主食'
};

module.exports = Order;
