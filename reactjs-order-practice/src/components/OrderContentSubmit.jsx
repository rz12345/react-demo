import React, {Component} from 'react';

class OrderSubmit extends Component {
    handleClick() {
        // dump order & addition records
        const data = {
            order: this.props.order,
            addition: this.props.addition
        };
        console.log('--- dump order & addition records ---');
        console.log(data);

        // clear order & addition records
        console.log('--- clear order & addition records ---');
        this.props.clearOrderAndAdditon();

    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <button type="submit" className="btn btn-info btn-lg btn-block" disabled={this.props.order.length == 0
                ? 'disabled'
                : ''} onClick={this.handleClick}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i><br/>送單
            </button>
        );
    }
}

export default OrderSubmit;
