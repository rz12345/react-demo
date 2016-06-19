import React from 'react'

// jsx components
const MenuRow = require('./MenuRow.jsx');

// js helper
const ArrayHelper = require('./../helpers/ArrayHelper');

class MenuItem extends React.Component {
    render() {
        const {
            items,
            onClickItem,
            contentDivHeight
            } = this.props;
        const splitedItems = items ? ArrayHelper.splitArray2D(items, 4) : null;
        const categoriesHeight = 83;
        const itemsPageNavHeight = 101;
        const paddingHeight = 10;
        const rowHeight = contentDivHeight ? (contentDivHeight - categoriesHeight - itemsPageNavHeight - paddingHeight) / 3 : null;
        const menuItemsRowStyle = rowHeight
            ? {
                height: rowHeight + 'px'
            }
            : {
                height: 'inherit'
            };


        return (
            <div className="item">
                {splitedItems ? splitedItems.map((items, i)=>(
                    <MenuRow key={i} items={items} onClickItem={onClickItem} style={menuItemsRowStyle}/>
                )) : ''}
            </div>
        );
    }
}

module.exports = MenuItem;
