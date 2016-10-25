import fetch from 'isomorphic-fetch'

export const FETCH_CATEGORY_DATA = 'FETCH_CATEGORY_DATA'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'

export function fetchCategoryData() {
    return dispatch => {
        return fetch('./db/category.json')
            .then(response => response.json())
            .then(json => dispatch({
                type: FETCH_CATEGORY_DATA,
                data: json,
                receivedAt: Date.now()
            }))
    }
}
export function changeCategoryBy(id) {
    return {
        type: CHANGE_CATEGORY,
        id: id
    }
}
