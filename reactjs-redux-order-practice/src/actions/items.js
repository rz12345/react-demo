import fetch from 'isomorphic-fetch'

export const FETCH_ITEM_DATA = 'FETCH_ITEM_DATA'
export const UPDATE_MENU_STYLE = 'UPDATE_MENU_STYLE'

export function fetchItemData() {
    return dispatch => {
        return fetch('./db/item.json')
            .then(response => response.json())
            .then(json => dispatch({
                type: FETCH_ITEM_DATA,
                data: json,
                receivedAt: Date.now()
            }))
    }
}

export function updateMenuStyle(style) {
    return {
        type: UPDATE_MENU_STYLE,
        style: style
    }
}
