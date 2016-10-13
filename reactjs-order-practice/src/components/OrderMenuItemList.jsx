import React, {Component} from 'react';
import OrderConstants from '../constants/OrderConstants';
import OrderActions from '../actions/OrderActions';

class OrderMenuItem extends Component {
    handleClickItem(item) {
        this.props.updateOrder(OrderActions.addItemToOrder, item);
    }

    constructor(props) {
        super(props);
        this.handleClickItem = this.handleClickItem.bind(this);
    }

    render() {
        return (
            <div className="col-md-3 nopadding" onClick={this.handleClickItem.bind(this, this.props.item)}>
                <div className="box" style={this.props.itemRowStyle}>
                    <div className="text">{this.props.item.name}</div>
                </div>
            </div>
        );
    }
}

class OrderMenuItemList extends Component {
    getItemRowHeight() {
        const bodyHeight = document.body.clientHeight;
        const rowHeight = (bodyHeight - OrderConstants.menuItemRowMarginHeight - OrderConstants.menuCategoryListHeight - OrderConstants.menuPagerHeight) / OrderConstants.menuItemListRows;
        this.setState({
            itemRowStyle: {
                height: rowHeight + 'px'
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            itemRowStyle: {
                height: 'inherit'
            }
        };
        this.getItemRowHeight = this.getItemRowHeight.bind(this);
    }

    componentDidMount() {
        // item 動態列高
        this.getItemRowHeight();
        window.addEventListener('resize', () => this.getItemRowHeight());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.getItemRowHeight());
    }

    render() {
        return (
            <div className="item">
                <div className="row">
                    {this.props.items.map((record) => (<OrderMenuItem key={record.id} item={record} itemRowStyle={this.state.itemRowStyle} updateOrder={this.props.updateOrder}/>))}
                </div>
            </div>
        );
    }
}

export default OrderMenuItemList;
