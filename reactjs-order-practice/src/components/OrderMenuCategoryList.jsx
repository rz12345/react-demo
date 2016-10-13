import React, {Component} from 'react';

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
    handleClick(categoryId) {
        // refresh menu item
        const currentPage = 0;
        this.props.updateMenu(categoryId, currentPage);
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="category">
                <ul className="nav nav-pills nav-justified">
                    {this.props.categories.map((record) => (<OrderMenyCategoryListItem key={record.id} name={record.name} onClick={this.handleClick.bind(this, record.id)} isSelected={this.props.categoryId === record.id}/>))}
                </ul>
            </div>
        );
    }
}

export default OrderMenuCategoryList;
