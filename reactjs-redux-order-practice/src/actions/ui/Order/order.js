import {
    createAction
} from 'redux-actions'
import {
    ADD_ITEM_TO_ORDER,
    REMOVE_ITEM_FROM_ORDER,
    ADD_ADDITION_TO_ORDER,
    UPADTE_ADDITION,
    REMOVE_ADDITION_FROM_ORDER,
    UPDATE_ORDER_STYLE,
    TOGGLE_TOGO_STATUS,
    TOGGLE_WHEN_STATUS,
    SUBMIT_ORDER
} from '../../../constants/ActionTypes'

export const addItemToOrder = createAction(ADD_ITEM_TO_ORDER)
export const removeItemFromOrder = createAction(REMOVE_ITEM_FROM_ORDER)
export const addAdditionToOrder = createAction(ADD_ADDITION_TO_ORDER)
export const updateAddition = createAction(UPADTE_ADDITION)
export const removeAdditionFromOrder = createAction(REMOVE_ADDITION_FROM_ORDER)
export const updateOrderStyle = createAction(UPDATE_ORDER_STYLE)
export const toggleToGoStatus = createAction(TOGGLE_TOGO_STATUS)
export const toggleWhenStatus = createAction(TOGGLE_WHEN_STATUS)
export const sumbitOrder = createAction(SUBMIT_ORDER)
