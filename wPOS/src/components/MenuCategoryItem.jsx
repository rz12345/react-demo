import React from 'react'

// list item click toggle class
// example: http://jsfiddle.net/faria/3nodz94g/

class MenuCategoryItem extends React.Component {
    render() {
        const {category,onClick,isSelected} = this.props;
        return (
            <li role="presentation"
                className={isSelected ? "active": ""}
                onClick={onClick}>
                <a href="javascript: void 0;"><h2>{category}</h2></a>
            </li>
        );
    }
}
MenuCategoryItem.defaultProps = {
    isSelected: false
};
MenuCategoryItem.propTypes = {
    isSelected: React.PropTypes.bool.isRequired
};

module.exports = MenuCategoryItem;
