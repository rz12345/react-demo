import React from 'react'

class MenuRowItem extends React.Component {
    render() {
        const {item,className,onClickItem} = this.props;
        return (
            <div key={item.i}
                 className={className}
                 onClick={() => onClickItem && onClickItem(item)}>
                {item.name}
            </div>
        );
    }
}

module.exports = MenuRowItem;
