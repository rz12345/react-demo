import React, {Component} from 'react';
import OrderConstants from '../constants/OrderConstants';
import OrderActions from './../actions/OrderActions';
import OrderStore from '../stores/OrderStore';

// stateless component
const OrderMenuItem = (props) => {
    return (
        <div className="col-md-3 nopadding" onClick={props.handleClickItem && props.handleClickItem.bind(this, props.item)}>
            <div className="box" style={props.itemRowStyle}>
                <div className="text">{props.item.name}</div>
            </div>
        </div>
    );
};

class OrderMenuItemList extends Component {
    handleClickItem(item) {
        OrderActions.addItemToOrder(item);
    }

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
            items: [],
            itemRowStyle: {
                height: 'inherit'
            }
        };
        this.getItemRowHeight = this.getItemRowHeight.bind(this);
    }

    componentDidMount() {
        OrderStore.addChangeListener(() => this.setState({items: OrderStore.getItems()}));

        // item 動態列高
        this.getItemRowHeight();
        window.addEventListener('resize', () => this.getItemRowHeight());
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener();
        window.removeEventListener('resize', () => this.getItemRowHeight());
    }

    render() {
        return (
            <div className="item">
                <div className="row">
                    {this.state.items.map((record) => (<OrderMenuItem key={record.id} item={record} itemRowStyle={this.state.itemRowStyle} handleClickItem={this.handleClickItem}/>))}
                </div>
            </div>
        );
    }
}

export default OrderMenuItemList;
