export const ADD_ITEM_TO_ORDER = 'ADD_ITEM_TO_ORDER'
export const REMOVE_ITEM_FROM_ORDER = 'REMOVE_ITEM_FROM_ORDER'

export const ADD_ADDITION_TO_ORDER = 'ADD_ADDITION_TO_ORDER'
export const REMOVE_ADDITION_FROM_ORDER = 'REMOVE_ADDITION_FROM_ORDER'
export const UPADTE_ADDITION = 'UPADTE_ADDITION'

export const UPDATE_ORDER_STYLE = 'UPDATE_ORDER_STYLE'
export const TOGGLE_TOGO_STATUS = 'TOGGLE_TOGO_STATUS'
export const TOGGLE_WHEN_STATUS = 'TOGGLE_WHEN_STATUS'

export const SUBMIT_ORDER = 'SUBMIT_ORDER'

export function addItemToOrder(item) {
    return {
        type: ADD_ITEM_TO_ORDER,
        item: item
    }
}

export function removeItemFromOrder(item) {
    return {
        type: REMOVE_ITEM_FROM_ORDER,
        item: item
    }
}



/* <OrderContentDetail/> */
export function removeAdditionFromOrder(addition) {
    return {
        type: REMOVE_ADDITION_FROM_ORDER,
        addition: addition
    }
}

export function updateAddition(addition) {
    return {
        type: UPADTE_ADDITION,
        addition: addition
    }
}


export function updateOrderStyle(style) {
    return {
        type: UPDATE_ORDER_STYLE,
        style: style
    }
}

/* <OrderContentOperation/> */
export function addAdditionToOrder() {
    return {
        type: ADD_ADDITION_TO_ORDER
    }
}

export function toggleToGoStatus() {
    return {
        type: TOGGLE_TOGO_STATUS
    }
}

export function toggleWhenStatus() {
    return {
        type: TOGGLE_WHEN_STATUS
    }
}

export function sumbitOrder() {
    return {
        type: SUBMIT_ORDER
    }
}
