import fetch from 'isomorphic-fetch'

export const FETCH_TABLE_DATA = 'FETCH_TABLE_DATA'

export function fetchTableData() {
    return dispatch => {
        return fetch('./db/tables.json')
            .then(response => response.json())
            .then(json => dispatch({
                type: FETCH_TABLE_DATA,
                data: json,
                receivedAt: Date.now()
            }))
    }
}
