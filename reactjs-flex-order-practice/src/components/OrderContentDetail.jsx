import React, {Component} from 'react';
import OrderActions from './../actions/OrderActions';
import OrderStore from '../stores/OrderStore';

class OrderItemFromMenu extends Component {
    handleClickItem() {
        OrderActions.removeItemFromOder(this.props.item);
    }

    constructor(props) {
        super(props);
        this.handleClickItem = this.handleClickItem.bind(this);
    }

    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.amount}</td>
                <td>{this.props.item.price}</td>
                <td>{this.props.item.subtotal}</td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={this.handleClickItem}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        );
    }

}

class OrderItemFromAddition extends Component {
    handleChange(e) {
        // 取值
        const id = e.target.dataset.id;
        const field = e.target.dataset.field;
        const value = e.target.value;

        // 改變 state
        let _item = this.state.item;
        _item[field] = value;
        _item.subtotal = _item.amount * _item.price;
        this.setState({item: _item});

        // 改變 store 的 addition
        OrderActions.updateAdditionItem(id, field, value);
    }

    handleClickAddition(item) {
        OrderActions.removeItemFromAddition(item);
    }

    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <tr>
                <td><input type="text" className="form-control" data-id={this.state.item.id} data-field="name" value={this.state.item.name} onChange={this.handleChange}/></td>
                <td><input type="number" className="form-control" data-id={this.state.item.id} data-field="amount" value={this.state.item.amount} onChange={this.handleChange}/></td>
                <td><input type="number" className="form-control" data-id={this.state.item.id} data-field="price" value={this.state.item.price} onChange={this.handleChange}/></td>
                <td>{this.state.item.subtotal}</td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={this.handleClickAddition && this.handleClickAddition.bind(this, this.state.item)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        );
    }
}

class OrderContentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            addition: []
        };
    }

    componentDidMount() {
        OrderStore.addChangeListener(() => this.setState({order: OrderStore.getCurrentOrder(), addition: OrderStore.getCurrenrAddition()}));
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener();
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>品項</th>
                        <th>數量</th>
                        <th>單價</th>
                        <th>小計</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.order.map((record) => (<OrderItemFromMenu key={record.id} item={record}/>))}
                    {this.state.addition.map((record) => (<OrderItemFromAddition key={record.id} item={record}/>))}
                </tbody>
            </table>
        );
    }
}

export default OrderContentDetail;
