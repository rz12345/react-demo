import {
    handleActions
} from 'redux-actions'
import {
    FETCH_ITEM_DATA,
    UPDATE_MENU_STYLE
} from '../../constants/ActionTypes'

export default handleActions({
    FETCH_ITEM_DATA: (state, {
        payload
    }) => {
        return Object.assign({}, state, {
            isFetched: true,
            records: payload,
            receivedAt: Date.now()
        })
    },
    UPDATE_MENU_STYLE: (state, {
        payload
    }) => {
        return Object.assign({}, state, {
            itemRowStyle: payload
        })
    }
}, {
    isFetched: false,
    itemRowStyle: {
        height: 'inherit'
    },
    records: []
})
