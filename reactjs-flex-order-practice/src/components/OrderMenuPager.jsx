import React, {Component} from 'react';
import OrderActions from '../actions/OrderActions';
import OrderStore from '../stores/OrderStore';
// import OrderConstants from '../constants/OrderConstants';

class OrderMenuPager extends Component {
    handleClick(i) {
        // 更新當前頁面 idx
        this.setState({currentMenuPage: i});

        // OrderStore 的 當前頁面 idx 也要一併更新
        OrderActions.changeCurrentMenuPage(i);
    }

    constructor(props) {
        super(props);
        this.state = {
            menuPagesCount: null,
            currentMenuPage: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        OrderStore.addChangeListener(() => {
            this.setState({menuPagesCount: OrderStore.getMenuPagesCount(), currentMenuPage: OrderStore.getCurrentMenuPage()})
        });
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener();
    }

    render() {
        const hasNextPage = this.state.menuPagesCount - this.state.currentMenuPage > 1; // 是否還有下一頁
        const hasPrevPage = this.state.currentMenuPage - 1 > -1; // 是否還有上一頁
        const nextPage = hasNextPage
            ? this.state.currentMenuPage + 1
            : this.state.currentMenuPage;
        const prevPage = hasPrevPage
            ? this.state.currentMenuPage - 1
            : this.state.currentMenuPage;

        return (
            <div className="item-nav">
                <div className="btn-group btn-group-justified" role="group" aria-label="MenuItemNav">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-lg btn-default" onClick={() => this.handleClick && this.handleClick(prevPage)} disabled={!hasPrevPage
                            ? 'disabled'
                            : ''}>
                            <span className="glyphicon glyphicon-backward"></span>
                        </button>
                    </div>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-lg btn-default" onClick={() => this.handleClick && this.handleClick(nextPage)} disabled={!hasNextPage
                            ? 'disabled'
                            : ''}>
                            <span className="glyphicon glyphicon-forward"></span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderMenuPager;
