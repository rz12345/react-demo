import React, {Component} from 'react';
import OrderActions from './../actions/OrderActions';
import OrderStore from '../stores/OrderStore';

class OrderAddAddition extends Component {
    handleClick() {
        OrderActions.addAdditionToOrder();
    }

    render() {
        return (
            <div className="col-md-6 nopadding">
                <button type="button" className="btn btn-info btn-lg btn-block" onClick={this.handleClick}>
                    <strong>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        加點</strong>
                </button>
            </div>
        );
    }
}

class OrderToGo extends Component {
    handleClick() {
        OrderActions.toggleToGoStatus();
    }

    constructor(props) {
        super(props);
        this.state = {
            isToGo: null
        };
    }

    componentDidMount() {
        OrderStore.addChangeListener(() => this.setState({isToGo: OrderStore.getToGoStatus()}));
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener();
    }

    render() {
        const toGoIconClass = (this.state.isToGo)
            ? 'fa fa-hand-o-right'
            : 'fa fa-cutlery'; // 外帶狀態 icon
        const toGoButtonClass = ((this.state.isToGo)
            ? 'btn btn-danger'
            : 'btn btn-success') + ' btn-lg btn-block';
        return (
            <div className="col-md-6 nopadding">
                <button type="button" className={toGoButtonClass} onClick={this.handleClick}>
                    <strong>
                        <i className={toGoIconClass} aria-hidden="true"></i>
                        {this.state.isToGo
                            ? '外帶'
                            : '內用'}</strong>
                </button>
            </div>
        );
    }
}

class OrderWhen extends Component {
    handleClick() {
        OrderActions.toggleWhenStatus();
    }

    constructor(props) {
        super(props);
        this.state = {
            when: null
        };
    }

    componentDidMount() {
        OrderStore.addChangeListener(() => this.setState({when: OrderStore.getwhenStatus()}));
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener();
    }

    render() {
        const whenIconClass = (this.state.when === '中午')
            ? 'fa fa-sun-o'
            : 'fa fa-moon-o'; // 中午/晚上狀態 icon
        const whenButtonClass = ((this.state.when === '中午')
            ? 'btn btn-warning'
            : 'btn btn-primary') + ' btn-lg btn-block'; // 中午/晚上狀態 icon
        return (
            <div className="col-md-6 nopadding">
                <button type="button" className={whenButtonClass} onClick={this.handleClick}>
                    <strong>
                        <i className={whenIconClass} aria-hidden="true"></i>
                        {this.state.when}</strong>
                </button>
            </div>
        );
    }
}

class OrderTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            isToGo: null
        };
    }

    componentDidMount() {
        OrderStore.addChangeListener(() => {
            this.setState({tables: OrderStore.getTables(), isToGo: OrderStore.getToGoStatus()})
        });
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener();
    }

    render() {
        if (this.state.isToGo == true) {
            return (
                <div className="col-md-6 nopadding">
                    <select className="form-control" name="table" disabled="disabled">
                        <option value="null">外帶</option>
                    </select>
                </div>
            );
        }
        return (
            <div className="col-md-6 nopadding">
                <select className="form-control" name="table">
                    {this.state.tables.map((table) => (
                        <option key={table.id} value={table.id}>
                            {table.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

const OrderContentOperation = () => (
    <div className="col-md-12 nopadding">
        <OrderAddAddition/>
        <OrderToGo/>
        <OrderWhen/>
        <OrderTables/>
    </div>
);

export default OrderContentOperation;
