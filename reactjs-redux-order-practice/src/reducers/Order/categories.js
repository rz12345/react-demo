import {
    handleActions
} from 'redux-actions'
import {
    FETCH_CATEGORY_DATA,
    CHANGE_CATEGORY
} from '../../constants/ActionTypes'

export default handleActions({
    FETCH_CATEGORY_DATA: (state, {
        payload
    }) => {
        return Object.assign({}, state, {
            isFetched: true,
            selectedId: payload[0].id,
            records: payload,
            receivedAt: Date.now()
        })
    },
    CHANGE_CATEGORY: (state, {
        payload
    }) => {
        return Object.assign({}, state, {
            selectedId: payload
        })
    }
}, {
    isFetched: false,
    selectedId: -1,
    records: []
})
