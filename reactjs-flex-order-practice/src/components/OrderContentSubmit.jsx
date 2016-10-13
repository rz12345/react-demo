import React, {Component} from 'react';
import OrderActions from './../actions/OrderActions';
import OrderStore from '../stores/OrderStore';

class OrderSubmit extends Component {
    handleClick() {
        // dump order & addition records
        const data = {
            order: OrderStore.getCurrentOrder(),
            addition: OrderStore.getCurrenrAddition()
        };
        console.log('--- dump order & addition records ---');
        console.log(data);

        // clear order & addition records
        console.log('--- clear order & addition records ---');
        OrderActions.clearOrderAndAdditon();

    }

    constructor(props) {
        super(props);
        this.state = {
            order: []
        };
    }

    componentDidMount() {
        OrderStore.addChangeListener(() => this.setState({order: OrderStore.getCurrentOrder()}));
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener();
    }

    render() {
        return (
            <button type="submit" className="btn btn-info btn-lg btn-block" disabled={this.state.order.length == 0
                ? 'disabled'
                : ''} onClick={this.handleClick}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i><br/>送單
            </button>
        );
    }
}

export default OrderSubmit;
