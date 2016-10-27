import fetch from 'isomorphic-fetch'
import {
    FETCH_CATEGORY_DATA,
    FETCH_ITEM_DATA,
    FETCH_TABLE_DATA
} from '../constants/ActionTypes'

export function fetchCategoryData() {
    return dispatch => {
        return fetch('./db/category.json')
            .then(response => response.json())
            .then(json => dispatch({
                type: FETCH_CATEGORY_DATA,
                payload: json
            }))
    }
}

export function fetchItemData() {
    return dispatch => {
        return fetch('./db/item.json')
            .then(response => response.json())
            .then(json => dispatch({
                type: FETCH_ITEM_DATA,
                payload: json
            }))
    }
}

export function fetchTableData() {
    return dispatch => {
        return fetch('./db/tables.json')
            .then(response => response.json())
            .then(json => dispatch({
                type: FETCH_TABLE_DATA,
                payload: json
            }))
    }
}
