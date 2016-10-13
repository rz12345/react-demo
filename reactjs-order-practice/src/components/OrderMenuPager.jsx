import React, {Component} from 'react';
import OrderConstants from '../constants/OrderConstants';

class OrderMenuPager extends Component {
    handleClick(pageId) {
        // 更新當前頁面 idx
        this.setState({currentMenuPage: pageId});

        // refresh menu item
        this.props.updateMenu(this.props.categoryId, pageId);
    }

    constructor(props) {
        super(props);
        this.state = {
            menuPagesCount: null,
            currentMenuPage: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.categoryId !== nextProps.categoryId && nextProps.categoryId !== null) {
            const menuPagesCount = Math.ceil(nextProps.items.filter((record) => {
                return record.category_id == nextProps.categoryId;
            }).length / OrderConstants.itemsPerPageAmount);
            this.setState({menuPagesCount: menuPagesCount});
        }
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
