import React from 'react'
import ReactDOM from 'react-dom'

// config
const API = require('./../configs/API');

class OrderSubmit extends React.Component {
    handleToGoToggle(e) {
        this.setState({
            paymentIsToGo: !this.state.paymentIsToGo
        });
    }

    handlePartToggle(e) {
        this.setState({
            part: this.state.part === '中午' ? '晚上' : '中午'
        });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            paymentIsToGo: false,
            part: '中午',
            tables: []
        };
        this.handleToGoToggle = this.handleToGoToggle.bind(this);
        this.handlePartToggle = this.handlePartToggle.bind(this);
    }

    componentDidMount() {
        // 取得 div.order-submit 高度
        const node = ReactDOM.findDOMNode(this.refs.orderSubmit);
        const nodeHeight = node.clientHeight;

        // 將 orderSubmitHeight 寫回父層 this.state 內
        this.props.updateOrderSubmitHeight(nodeHeight);

        // 檢查是中午或晚上
        const now = new Date();
        const nightStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 30, 0, 0);
        this.setState({
            part: (now.getTime() - nightStart.getTime() < 0) ? '中午' : '晚上'
        });

        // 取得桌名
        fetch(API.get.table, {
            method: 'GET'
        }).then((response) => response.json()).then((records) => this.setState({
            tables: records.map((record) => record.name)
        }));
    }

    render() {
        const {order, total, onClickNewAddition} = this.props;
        const {paymentIsToGo,part} = this.state;
        const {tables} = this.state;
        const partIconClass = (part === '中午') ? 'fa fa-sun-o' : 'fa fa-moon-o'; // 中午/晚上狀態 icon
        const partButtonClass = ((part === '中午') ? 'btn btn-warning' : 'btn btn-primary') + ' btn-lg btn-block'; // 中午/晚上狀態 icon
        const toGoIconClass = (paymentIsToGo) ? 'fa fa-hand-o-right' : 'fa fa-cutlery'; // 外帶狀態 icon
        const toGoButtonClass = (paymentIsToGo ? 'btn btn-danger' : 'btn btn-success') + ' btn-lg btn-block';
        return (
            <div className="order-submit" ref="orderSubmit">
                <div className="row">
                    <div className="col-md-6 nopadding">
                        <div className="col-md-6 nopadding">
                            <button type="button" className="btn btn-info btn-lg btn-block"
                                    onClick={() => onClickNewAddition()}>
                                <strong><i className="fa fa-plus" aria-hidden="true"></i> 加點</strong>
                            </button>
                        </div>
                        <div className="col-md-6 nopadding">
                            <button type="button" className={toGoButtonClass}
                                    onClick={this.handleToGoToggle}>
                                <strong><i className={toGoIconClass} aria-hidden="true"></i> {paymentIsToGo
                                    ? '外帶'
                                    : '內用'}</strong>
                            </button>
                        </div>
                        <div className="col-md-6 nopadding">
                            <button type="button" className={partButtonClass}
                                    onClick={this.handlePartToggle}>
                                <strong><i className={partIconClass} aria-hidden="true"></i> {part}</strong>
                            </button>
                        </div>
                        <div className="col-md-6 nopadding">
                            <select className="form-control" name="table" disabled={paymentIsToGo ? 'disabled':''}>
                                {!paymentIsToGo ?
                                    tables.map((table, i)=><option key={i} value={table}>{table}</option>)
                                    :
                                    <option value="null">外帶</option>
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 nopadding">
                        <input type="hidden" name="is_to_go" value={paymentIsToGo}/>
                        <input type="hidden" name="is_paid" value={true}/>
                        <input type="hidden" name="part" value={part}/>
                        <button type="submit" className="btn btn-info btn-lg btn-block" disabled={order.length == 0
                                    ? 'disabled'
                                    : ''}><i className="fa fa-shopping-cart" aria-hidden="true"></i><br/>送單
                        </button>
                    </div>
                    <div className="col-md-3 nopadding">
                        <div className="panel panel-default text-center total">
                            <div className="title" ref="panelHeading">
                                總計
                            </div>
                            <div className="value">
                                {total}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = OrderSubmit;
