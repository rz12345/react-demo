import {
    createAction
} from 'redux-actions'
import {
    CHANGE_MENU_PAGE,
    RESET_MENU_PAGE
} from '../../../constants/ActionTypes'

export const changeMenuPageBy = createAction(CHANGE_MENU_PAGE)
export const resetMenuPage = createAction(RESET_MENU_PAGE)
