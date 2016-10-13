import React, {Component} from 'react';
import OrderConstants from '../constants/OrderConstants';
import OrderContentDetail from './OrderContentDetail.jsx';
import OrderContentOperation from './OrderContentOperation.jsx';
import OrderContentSubmit from './OrderContentSubmit.jsx';
import OrderContentTotal from './OrderContentTotal.jsx';

class OrderContent extends Component {
    getOrderContentRowHeight() {
        const bodyHeight = document.body.clientHeight;
        const orderContentHeight = (bodyHeight - OrderConstants.contentDetailHeadingHeight - OrderConstants.contentOperationHeight);
        this.setState({
            orderContentStyle: {
                height: orderContentHeight + 'px'
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            orderContentStyle: {
                height: 'inherit'
            }
        };
        this.getOrderContentRowHeight = this.getOrderContentRowHeight.bind(this);
    }

    componentDidMount() {
        // item 動態列高
        this.getOrderContentRowHeight();
        window.addEventListener('resize', () => this.getOrderContentRowHeight());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.getOrderContentRowHeight());
    }

    render() {
        return (
          <div className="content col-md-6 center-container">
              <div className="panel panel-default center-container">
                  <div className="panel-heading">點單明細</div>
                  <div className="panel-body" style={this.state.orderContentStyle}>
                      <div className="order-details">
                          <OrderContentDetail/>
                      </div>
                      <div className="order-submit">
                          <div className="row">
                              <div className="col-md-6 nopadding">
                                  <OrderContentOperation/>
                              </div>
                              <div className="col-md-3 nopadding">
                                  <OrderContentSubmit/>
                              </div>
                              <div className="col-md-3 nopadding">
                                  <OrderContentTotal/>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
        );
    }
}


export default OrderContent;
