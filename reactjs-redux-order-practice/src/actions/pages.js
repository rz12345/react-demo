export const CHANGE_MENU_PAGE = 'CHANGE_MENU_PAGE'
export const RESET_MENU_PAGE = 'RESET_MENU_PAGE'

export function changeMenuPageBy(id) {
    return {
        type: CHANGE_MENU_PAGE,
        id: id
    }
}

export function resetMenuPage() {
    return {
        type: RESET_MENU_PAGE,
        id: 0
    }
}
