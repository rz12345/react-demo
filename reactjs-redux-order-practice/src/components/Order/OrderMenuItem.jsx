import React, {Component, PropTypes} from 'react'
import {getItemRowStyle} from '../../helpers'

class OrderMenuItem extends Component {
    componentDidMount() {
        // item 動態列高
        const {updateMenuStyle} = this.props
        updateMenuStyle(getItemRowStyle())
        window.addEventListener('resize', () => updateMenuStyle(getItemRowStyle()))
    }

    componentWillUnmount() {
        const {updateMenuStyle} = this.props
        window.removeEventListener('resize', () => updateMenuStyle(getItemRowStyle()))
    }

    render() {
        const {items, itemRowStyle, addItemToOrder} = this.props
        return (
            <div className="item">
                <div className="row">
                    {items.map((item) => (
                        <div key={item.id} className="col-md-3 nopadding">
                            <div className="box" style={itemRowStyle} onClick={() => addItemToOrder(item)}>
                                <div className="text">{item.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
OrderMenuItem.propTypes = {
    items: PropTypes.array.isRequired,
    itemRowStyle: PropTypes.object.isRequired,
    updateMenuStyle: PropTypes.func.isRequired
}

export default OrderMenuItem
