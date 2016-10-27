import {
    handleActions
} from 'redux-actions'
import {
    CHANGE_MENU_PAGE,
    RESET_MENU_PAGE
} from '../../constants/ActionTypes'

export default handleActions({
    CHANGE_MENU_PAGE: (state, {
        payload
    }) => {
        return Object.assign({}, state, {
            currentPage: payload,
        })
    },
    RESET_MENU_PAGE: (state) => {
        return Object.assign({}, state, {
            currentPage: 0,
        })
    }
}, {
    currentPage: 0
})
