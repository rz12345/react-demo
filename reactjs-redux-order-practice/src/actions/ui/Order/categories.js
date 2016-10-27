import {
    createAction
} from 'redux-actions'
import {
    CHANGE_CATEGORY
} from '../../../constants/ActionTypes'

export const changeCategoryBy = createAction(CHANGE_CATEGORY)
