import React from 'react'

// jsx components
const MenuCategoryItem = require('./MenuCategoryItem.jsx');

class MenuCategory extends React.Component {
    handleClick(i, category) {
        const {onClickCategroy} = this.props;
        // 觸發切換分類 item 動作
        onClickCategroy && onClickCategroy(category);

        // 設定選擇的 category (項目變成 active 狀態)
        this.setState({
            selectedItem: i
        });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedItem: 0
        };
    }

    render() {
        const {categories} = this.props;
        return (
            <div className="category">
                <ul className="nav nav-pills nav-justified">
                    {categories ? categories.map((category, i)=>
                            (<MenuCategoryItem key={i}
                                               category={category}
                                               onClick={this.handleClick.bind(this, i, category)}
                                               isSelected={this.state.selectedItem === i}/>)
                    ) : ''}
                </ul>
            </div>
        );
    }
}

module.exports = MenuCategory;
