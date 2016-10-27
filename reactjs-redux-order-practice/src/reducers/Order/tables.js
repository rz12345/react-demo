import {
    handleActions
} from 'redux-actions'
import {
    FETCH_TABLE_DATA
} from '../../constants/ActionTypes'

export default handleActions({
    FETCH_TABLE_DATA: (state, {
        payload
    }) => {
        return Object.assign({}, state, {
            isFetched: true,
            records: payload,
            receivedAt: Date.now()
        })
    }
}, {
    isFetched: false,
    records: []
})
