import {
    CHANGE_MENU_PAGE,
    RESET_MENU_PAGE
} from '../actions/pages'

export default function pages(state = {
    currentPage: 0
}, action) {
    switch (action.type) {
        case CHANGE_MENU_PAGE:
            return Object.assign({}, state, {
                currentPage: action.id,
            })
        case RESET_MENU_PAGE:
            return Object.assign({}, state, {
                currentPage: action.id,
            })
        default:
            return state
    }
}
