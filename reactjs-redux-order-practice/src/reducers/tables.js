import {
    FETCH_TABLE_DATA
} from '../actions/tables'

export default function tables(state = {
    isFetched: false,
    records: []
}, action) {
    switch (action.type) {
        case FETCH_TABLE_DATA:
            return Object.assign({}, state, {
                isFetched: true,
                records: action.data,
                receivedAt: action.receivedAt
            })
        default:
            return state
    }
}
