import React from 'react'
import ReactDOM from 'react-dom'

// config
const API = require('./../configs/API');
const PaymentHelper = require('./../helpers/PaymentHelper');

class Home extends React.Component {
    // 刪除 payment
    deletePayment(id) {
        const {payments} = this.state;
        // 刪除 payment
        this.setState({
            payments: payments.filter((payment) => payment.id !== id)
        });
        console.log('刪除編號' + id + '點單');
        // fetch(API.delete.payment + '/' + id, {
        //     method: 'DELETE'
        // }).then(() => {
        //     this.setState({
        //         payments: payments.filter((payment) => payment.id !== id)
        //     });
        // });
    }

    // 觸發 window resize 事件時, 重算 contentDivHeight
    handleResize(e) {
        const contentNode = ReactDOM.findDOMNode(this);
        const contentNodeHeight = contentNode.clientHeight;
        this.setState({contentNodeHeight: contentNodeHeight});
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            payments: [],
            contentDivHeight: null,
            pageHeaderNodeHeight: null,
            panelHeadingHeight: null
        };
        this.handleResize = this.handleResize.bind(this);
        this.deletePayment = this.deletePayment.bind(this);
    }

    componentDidMount() {
        // 監聽 resize , 並觸發動作
        $(window).on('resize', this.handleResize);

        // 抓取 categories
        fetch(API.get.payment.today, {method: 'GET'}).then((response) => response.json()).then((payments) => this.setState({payments: payments}));

        // 取得 div.content 高度
        const contentNode = ReactDOM.findDOMNode(this);
        const contentNodeHeight = contentNode.clientHeight;
        const pageHeaderNode = ReactDOM.findDOMNode(this.refs.pageHeader);
        const pageHeaderNodeHeight = pageHeaderNode.clientHeight;
        const panelHeadingNode = ReactDOM.findDOMNode(this.refs.panelHeading);
        const panelHeadingHeight = panelHeadingNode.clientHeight;

        this.setState({contentNodeHeight: contentNodeHeight, pageHeaderNodeHeight: pageHeaderNodeHeight, panelHeadingHeight: panelHeadingHeight});
    }

    componentWillUnmount() {
        $(window).off('resize', this.handleResize);
    }

    render() {
        const {payments} = this.state;
        const {contentNodeHeight, pageHeaderNodeHeight, panelHeadingHeight} = this.state;
        const rowHeight = 51;
        const panelBodyHeight = contentNodeHeight - pageHeaderNodeHeight - panelHeadingHeight - rowHeight;
        const panelBodyDivStyle = panelBodyHeight
            ? {
                height: panelBodyHeight + 'px'
            }
            : {
                height: 'inherit'
            };
        return (
            <div className="home center-container">
                <div class="page-header" ref="pageHeader">
                    <h1>wPOS
                        <small>demo</small>
                    </h1>
                </div>
                <div className="col-md-12 center-container content">
                    <div className="panel panel-default center-container">
                        <div className="panel-heading lead" ref="panelHeading">今日帳單</div>
                        <div className="panel-body home-details" style={panelBodyDivStyle}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>單號</th>
                                        <th>桌號</th>
                                        <th>摘要</th>
                                        <th>金額</th>
                                        <th>時間</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment, i) => (
                                        <tr key={i}>
                                            <td>{payment.id}</td>
                                            <td>{!payment.is_to_go
                                                    ? payment.table
                                                    : '外帶'}</td>
                                            <td>{PaymentHelper.getPaymentSummary(payment.summary)}</td>
                                            <td>{payment.total}</td>
                                            <td>{payment.part}
                                                ({payment.created_at})</td>
                                            <td>
                                                <button onClick={this.deletePayment.bind(this, payment.id)}>刪除</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Home;
