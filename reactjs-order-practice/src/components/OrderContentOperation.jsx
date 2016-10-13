import React, {Component} from 'react';
import OrderActions from './../actions/OrderActions';

class OrderAddAddition extends Component {
    handleClick() {
        this.props.updateAddition(OrderActions.addAdditionToOrder);
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
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
        this.props.updateIsToGoStatus();
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const toGoIconClass = (this.props.isToGo)
            ? 'fa fa-hand-o-right'
            : 'fa fa-cutlery'; // 外帶狀態 icon
        const toGoButtonClass = ((this.props.isToGo)
            ? 'btn btn-danger'
            : 'btn btn-success') + ' btn-lg btn-block';
        return (
            <div className="col-md-6 nopadding">
                <button type="button" className={toGoButtonClass} onClick={this.handleClick}>
                    <strong>
                        <i className={toGoIconClass} aria-hidden="true"></i>
                        {this.props.isToGo
                            ? '外帶'
                            : '內用'}</strong>
                </button>
            </div>
        );
    }
}

class OrderWhen extends Component {
    handleClick() {
        this.props.updateWhenStatus();
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const whenIconClass = (this.props.when === '中午')
            ? 'fa fa-sun-o'
            : 'fa fa-moon-o'; // 中午/晚上狀態 icon
        const whenButtonClass = ((this.props.when === '中午')
            ? 'btn btn-warning'
            : 'btn btn-primary') + ' btn-lg btn-block'; // 中午/晚上狀態 icon
        return (
            <div className="col-md-6 nopadding">
                <button type="button" className={whenButtonClass} onClick={this.handleClick}>
                    <strong>
                        <i className={whenIconClass} aria-hidden="true"></i>
                        {this.props.when}</strong>
                </button>
            </div>
        );
    }
}

class OrderTables extends Component {
    render() {
        if (this.props.isToGo == true) {
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
                    {this.props.tables.map((table) => (
                        <option key={table.id} value={table.id}>
                            {table.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

const OrderContentOperation = (props) => (
    <div className="col-md-12 nopadding">
        <OrderAddAddition updateAddition={props.updateAddition}/>
        <OrderToGo isToGo={props.isToGo} updateIsToGoStatus={props.updateIsToGoStatus}/>
        <OrderWhen when={props.when} updateWhenStatus={props.updateWhenStatus}/>
        <OrderTables tables={props.tables}/>
    </div>
);

export default OrderContentOperation;
