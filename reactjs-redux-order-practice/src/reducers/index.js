import {
    combineReducers
} from 'redux'
import categories from './categories'
import items from './items'
import tables from './tables'
import pages from './pages'
import order from './order'

const rootReducer = combineReducers({
    categories,
    items,
    tables,
    pages,
    order
})

export default rootReducer
