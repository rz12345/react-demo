import {
    FETCH_CATEGORY_DATA,
    CHANGE_CATEGORY
} from '../actions/categories'

export default function categories(state = {
    isFetched: false,
    selectedId: -1,
    records: []
}, action) {
    switch (action.type) {
        case FETCH_CATEGORY_DATA:
            return Object.assign({}, state, {
                isFetched: true,
                selectedId: action.data[0].id,
                records: action.data,
                receivedAt: action.receivedAt
            })
        case CHANGE_CATEGORY:
            return Object.assign({}, state, {
                selectedId: action.id
            })
        default:
            return state
    }
}
