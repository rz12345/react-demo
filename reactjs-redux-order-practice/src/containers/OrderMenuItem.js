import {connect} from 'react-redux'
import {updateMenuStyle} from '../actions/items'
import {addItemToOrder} from '../actions/order'
import {filterItemsBy} from '../helpers'
import OrderMenuItem from '../components/OrderMenuItem.jsx'

function mapStateToProps(state) {
    return {
        items: filterItemsBy(state.items.records, state.categories.selectedId, state.pages.currentPage),
        itemRowStyle: state.items.itemRowStyle
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateMenuStyle: (style) => dispatch(updateMenuStyle(style)),
        addItemToOrder: (item) => dispatch(addItemToOrder(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderMenuItem)
