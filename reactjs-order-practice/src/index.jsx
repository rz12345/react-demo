import React from 'react';
import ReactDOM from 'react-dom';
import OrderMenu from './components/OrderMenu.jsx';
import OrderContent from './components/OrderContent.jsx';
import OrderActions from './actions/OrderActions';
import OrderConstants from './constants/OrderConstants';

require("!style!css!sass!./styles/entry.scss");

class App extends React.Component {
    updateOrder(cb, item) {
        const order = cb(this.state.order, item);
        const total = OrderActions.updateTotal(order, this.state.addition);
        this.setState({order: order, total: total});
    }

    updateAddition(cb, item) {
        const addition = cb(this.state.addition, item);
        const total = OrderActions.updateTotal(this.state.order, addition);
        this.setState({addition: addition, total: total});
    }

    updateIsToGoStatus() {
        this.setState({
            isToGo: OrderActions.toggleIsToGoStatus(this.state.isToGo)
        });
    }

    updateWhenStatus() {
        this.setState({
            when: OrderActions.toggleWhenStatus(this.state.when)
        });
    }

    clearOrderAndAdditon() {
        this.setState({
            order: [],
            addition: [],
            total: 0,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            categories: [], // for <OrderMenu/>
            items: [], // for <OrderMenu/>
            order: [], // for <OrderContent/>
            addition: [], // for <OrderContent/>
            tables: [], // for <OrderContent/>
            when: OrderConstants.whenStatus, // for <OrderContent/>
            isToGo: false, // for <OrderContent/>
            total: 0, // for <OrderContent/>
        };
        this.updateOrder = this.updateOrder.bind(this);
        this.updateAddition = this.updateAddition.bind(this);
        this.updateIsToGoStatus = this.updateIsToGoStatus.bind(this);
        this.updateWhenStatus = this.updateWhenStatus.bind(this);
        this.clearOrderAndAdditon = this.clearOrderAndAdditon.bind(this);
    }

    componentDidMount() {
        // load items
        fetch('./db/item.json', {method: 'GET'}).then((response) => response.json()).then((records) => {
            this.setState({items: records});
        });

        // load categories && set default category
        fetch('./db/category.json', {method: 'GET'}).then((response) => response.json()).then((records) => {
            this.setState({categories: records, selectedCategory: records[0].id});
        });

        // load tables
        fetch('./db/tables.json', {method: 'GET'}).then((response) => response.json()).then((records) => {
            this.setState({tables: records});
        });
    }

    render() {
        return (
            <div id="wrap">
                <div className="order center-container">
                    <div className="center-row">
                        <div className="container-fluid center-container">
                            <OrderMenu items={this.state.items} categories={this.state.categories} updateOrder={this.updateOrder}/> {/* 左側欄 */}
                            <OrderContent order={this.state.order} addition={this.state.addition} tables={this.state.tables} when={this.state.when} isToGo={this.state.isToGo} total={this.state.total} updateOrder={this.updateOrder} updateAddition={this.updateAddition} updateIsToGoStatus={this.updateIsToGoStatus} updateWhenStatus={this.updateWhenStatus} clearOrderAndAdditon={this.clearOrderAndAdditon}/> {/* 右側欄 */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('app'));
