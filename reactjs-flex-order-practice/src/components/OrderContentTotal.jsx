import React, {Component} from 'react';
import OrderStore from '../stores/OrderStore';

class OrderContentTotal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: null
        };
    }

    componentDidMount() {
        OrderStore.addChangeListener(() => this.setState({total: OrderStore.getTotal()}));
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener();
    }

    render() {
        return (
            <div className="panel panel-default text-center total">
                <div className="title">
                    總計
                </div>
                <div className="value">
                    {this.state.total}
                </div>
            </div>
        );
    }
}

export default OrderContentTotal;
