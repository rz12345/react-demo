import React, {Component} from 'react';
import OrderActions from './../actions/OrderActions';
import OrderStore from './../stores/OrderStore';

// stateless component
const OrderMenyCategoryListItem = (props) => {
    const itemClass = props.isSelected
        ? "active"
        : "";
    return (
        <li role="presentation" className={itemClass} onClick={props.onClick}>
            <a href="javascript: void 0;">
                <h2>{props.name}</h2>
            </a>
        </li>
    )
};

class OrderMenuCategoryList extends Component {
    handleClick(i) {
        // 讓 click 的 category 變成 active
        this.setState({selectedCategory: i});

        // OrderStore 的 selectedCategory 也要一併更新
        OrderActions.changeSelectedCategory(i);

        // OrderStore 的 菜單分頁數 也要一併更新
        OrderActions.getMenuPagesCount(OrderStore.getItems(), 12);
    }

    constructor(props) {
        super(props);
        this.state = {
            categories: [], // 分類
            selectedCategory: null // 被選擇的分類
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        OrderStore.addChangeListener(() => {
            this.setState({categories: OrderStore.getCategories(), selectedCategory: OrderStore.getSelectCategoryId()})
        });
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener();
    }

    render() {
        return (
            <div className="category">
                <ul className="nav nav-pills nav-justified">
                    {this.state.categories.map((record) => (<OrderMenyCategoryListItem key={record.id} name={record.name} onClick={this.handleClick.bind(this, record.id)} isSelected={this.state.selectedCategory === record.id}/>))}
                </ul>
            </div>
        );
    }
}

export default OrderMenuCategoryList;
