import {
    combineReducers
} from 'redux'
import categories from './Order/categories'
import items from './Order/items'
import tables from './Order/tables'
import pages from './Order/pages'
import order from './Order/order'

const rootReducer = combineReducers({
    categories,
    items,
    tables,
    pages,
    order
})

export default rootReducer
