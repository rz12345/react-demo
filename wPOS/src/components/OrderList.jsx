import React from 'react'
import ReactDOM from 'react-dom'

// config
const API = require('./../configs/API');

// jsx components
const OrderSubmit = require('./OrderSubmit.jsx');
const OrderDetails = require('./OrderDetails.jsx');

class OrderList extends React.Component {
    // 背景執行提交表單的動作
    handleSubmit(e) {
        e.preventDefault();
        const {clearOrder} = this.props;
        const {order, addition, total} = this.state;
        // 提交
        alert('觸發提交動作, 清除 order!');
        // const formNode = ReactDOM.findDOMNode(this);
        // fetch(API.post.payment, {
        //     method: 'POST',
        //     body: new FormData(formNode)
        // });
        // 呼叫父層清除 order 項目的方法
        clearOrder && clearOrder();
    }

    updateOrderSubmitHeight(height) {
        this.setState({
            orderSubmitHeight: height // 取得 orderSubmitHeight 高度
        });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            OrderSubmitHeight: null
        };
        this.updateOrderSubmitHeight = this.updateOrderSubmitHeight.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const {
            order,
            addition,
            total,
            onClickItem,
            onClickNewAddition,
            onClickDeleteAddition,
            onUpdateAddition,
            contentDivHeight,
            panelHeadingHeight
        } = this.props;
        const {orderSubmitHeight} = this.state;

        // 動態 OrderDetails 計算方法
        // 1. Order 接 contentDivHeight & panelHeadingHeight
        // 2. 當 OrderSubmit 生成後 , 產生  OrderSubmitHeight
        // 3.  contentDivHeight 減去 panelHeadingHeight && OrderSubmitHeight && 兩個 rowHeight 來得到 OrderDetails 必要之高度
        const rowHeight = 51;
        const orderDetailsHeight = (contentDivHeight && panelHeadingHeight && orderSubmitHeight)
            ? contentDivHeight - panelHeadingHeight - orderSubmitHeight
            : null;
        const props = {
            OrderDetails: {
                order: order,
                addition: addition,
                onClickItem: onClickItem,
                onClickDeleteAddition: onClickDeleteAddition,
                onUpdateAddition: onUpdateAddition,
                divHeight: orderDetailsHeight
            },
            OrderSubmit: {
                order: order,
                total: total,
                onClickNewAddition: onClickNewAddition,
                updateOrderSubmitHeight: this.updateOrderSubmitHeight
            }
        };

        return (
            <form action="" onSubmit={this.handleSubmit}>
                <OrderDetails {...props.OrderDetails}/>
                <OrderSubmit {...props.OrderSubmit}/>
            </form>
        );
    }
}

module.exports = OrderList;
