import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

const OrderActions = {
    /* Order 左側 Actions */
    loadMenuCategories() {
        const url = './db/category.json';
        fetch(url, {
            method: 'GET'
        }).then((response) => response.json()).then((records) => {
            AppDispatcher.dispatch({
                type: ActionTypes.LOAD_CATEGORIES_SUCCESS,
                data: records
            });
        });
    },
    loadMenuItems() {
        const url = './db/item.json';
        fetch(url, {
            method: 'GET'
        }).then((response) => response.json()).then((records) => {
            AppDispatcher.dispatch({
                type: ActionTypes.LOAD_ITEMS_SUCCESS,
                data: records
            });
        });
    },
    loadTables() {
        const url = './db/tables.json';

        fetch(url, {
            method: 'GET'
        }).then((response) => response.json()).then((records) => {
            AppDispatcher.dispatch({
                type: ActionTypes.LOAD_TABLES_SUCCESS,
                data: records
            });
        });
    },
    changeSelectedCategory(category_id) {
        AppDispatcher.dispatch({
            type: ActionTypes.CHANGE_SELECTED_CATEGORY,
            data: category_id
        });
    },
    getMenuPagesCount(items, itemsPerPageAmount) {
        AppDispatcher.dispatch({
            type: ActionTypes.GET_MENU_PAGES_COUNT,
            data: Math.ceil(items.length / itemsPerPageAmount)
        });
    },
    changeCurrentMenuPage(pageIdx) {
        AppDispatcher.dispatch({
            type: ActionTypes.CHANGE_CURRENT_MENU_PAGE,
            data: pageIdx
        });
    },
    addItemToOrder(item) {
        AppDispatcher.dispatch({
            type: ActionTypes.ADD_ITEM_TO_ORDER,
            data: item
        });
    },
    removeItemFromOder(item) {
        AppDispatcher.dispatch({
            type: ActionTypes.REMOVE_ITEM_FROM_ORDER,
            data: item
        });
    },
    addAdditionToOrder() {
        AppDispatcher.dispatch({
            type: ActionTypes.ADD_ADDITION_TO_ORDER,
        });
    },
    removeItemFromAddition(item) {
        AppDispatcher.dispatch({
            type: ActionTypes.REMOVE_ITEM_FROM_ADDITION,
            data: item
        });
    },
    updateAdditionItem(id, field, value) {
        AppDispatcher.dispatch({
            type: ActionTypes.UPADTE_ADDITION_ITEM,
            id: id,
            field: field,
            value: value,
        });
    },
    toggleToGoStatus() {
        AppDispatcher.dispatch({
            type: ActionTypes.TOGGLE_TOGO_STATUS,
        });
    },
    toggleWhenStatus() {
        AppDispatcher.dispatch({
            type: ActionTypes.TOGGLE_WHEN_STATUS,
        });
    },
    clearOrderAndAdditon() {
        AppDispatcher.dispatch({
            type: ActionTypes.CLEAR_ORDER_AND_ADDITION,
        });
    },
};

export default OrderActions;
