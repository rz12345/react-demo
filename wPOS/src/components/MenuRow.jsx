import React from 'react'

// jsx components
const MenuRowItem = require('./MenuRowItem.jsx');

class MenuRow extends React.Component {
    render() {
        const {items,onClickItem,style} = this.props;
        return (
            <div className="flex-container" style={style}>
                {items.map((item, i)=> (
                    <MenuRowItem key={i}
                                 item={item}
                                 className={"flex-item " + (i%2 == 1 ? 'bg-success' : 'bg-info')}
                                 onClickItem={onClickItem}/>
                ))}
            </div>
        );
    }
}

module.exports = MenuRow;
