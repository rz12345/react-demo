import {
    FETCH_ITEM_DATA,
    UPDATE_MENU_STYLE
} from '../actions/items'

export default function items(state = {
    isFetched: false,
    itemRowStyle: {
        height: 'inherit'
    },
    records: []
}, action) {
    switch (action.type) {
        case FETCH_ITEM_DATA:
            return Object.assign({}, state, {
                isFetched: true,
                records: action.data,
                receivedAt: action.receivedAt
            })
        case UPDATE_MENU_STYLE:
            return Object.assign({}, state, {
                itemRowStyle: action.style
            })
        default:
            return state
    }
}
