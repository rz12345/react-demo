import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import OrderConstants from '../constants/OrderConstants';

import {
    EventEmitter
} from 'events';

let store = {
    categories: [],
    selectedCategory: null, // 選取的 category_id
    items: [],
    menuPagesCount: null, // 菜單分頁數
    currentMenuPage: null, // 當前菜單分頁,
    order: [], // 當前 order 項目
    addition: [], // 當前 order addition 項目
    total: 0, // 總金額
    tables: [],
    isToGo: false, // 外帶狀態 (預設為 false),
    when: OrderConstants.whenStatus
};

class OrderStoreClass extends EventEmitter {
    addChangeListener(callback) {
        this.on(ActionTypes.CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeChangeListener(ActionTypes.CHANGE_EVENT, callback);
    }

    getCategories() {
        return store.categories;
    }

    getSelectCategoryId() {
        return store.selectedCategory;
    }

    getTables() {
        return store.tables;
    }

    getItems() {
        const currentCategoryItems = store.items.filter((item) => item.category_id == this.getSelectCategoryId());
        return currentCategoryItems.filter((record, i) => {
            return OrderConstants.itemsPerPageAmount * (this.getCurrentMenuPage()) <= i && i < OrderConstants.itemsPerPageAmount * (1 + this.getCurrentMenuPage());
        });
    }

    getMenuPagesCount() {
        const currentCategoryItems = store.items.filter((item) => item.category_id == this.getSelectCategoryId());
        return Math.ceil(currentCategoryItems.length / OrderConstants.itemsPerPageAmount);
    }

    getCurrentMenuPage() {
        return store.currentMenuPage;
    }

    getCurrentOrder() {
        return store.order;
    }

    getCurrenrAddition() {
        return store.addition;
    }

    getTotal() {
        return store.total;
    }

    getToGoStatus() {
        return store.isToGo;
    }

    getwhenStatus() {
        return store.when;
    }
}

const OrderStore = new OrderStoreClass();


AppDispatcher.register((action) => {
    let target = '';
    switch (action.type) {
        // load 菜單類別
        case ActionTypes.LOAD_CATEGORIES_SUCCESS:
            store.categories = action.data;
            store.selectedCategory = action.data[0].id; // 一併設定預設選取的 category_id
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // load 菜單項目
        case ActionTypes.LOAD_ITEMS_SUCCESS:
            store.items = action.data;
            store.currentMenuPage = 0; // 一併設定預設分頁
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // load 桌名
        case ActionTypes.LOAD_TABLES_SUCCESS:
            store.tables = action.data;
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // change 選擇的菜單類別
        case ActionTypes.CHANGE_SELECTED_CATEGORY:
            store.selectedCategory = action.data;
            store.currentMenuPage = 0; // 重設預設分頁
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // get 菜單分頁數
        case ActionTypes.GET_MENU_PAGES_COUNT:
            store.menuPagesCount = action.data;
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // change 當前分頁
        case ActionTypes.CHANGE_CURRENT_MENU_PAGE:
            store.currentMenuPage = action.data;
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // 加入 item 至 order
        case ActionTypes.ADD_ITEM_TO_ORDER:
            target = store.order.find((record) => record.id === action.data.id);
            if (target) {
                // 已在 order 內, 更新 obj 的 amount & subtotal
                target.amount += 1;
                target.subtotal = target.amount * target.price;
            } else {
                // 若不在 order 內, 產生新 obj
                store.order.push({
                    id: action.data.id,
                    name: action.data.name,
                    amount: 1,
                    price: action.data.price,
                    subtotal: 1 * action.data.price
                });
            }
            // 一併更新 total
            store.total = 0;
            store.order.map((el) => store.total += el.subtotal);
            store.addition.map((el) => store.total += el.subtotal);
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // 將 item 從 order 中移除
        case ActionTypes.REMOVE_ITEM_FROM_ORDER:
            target = store.order.find((record) => record.id === action.data.id);
            if (target) {
                target.amount -= 1;
                target.subtotal = target.amount * target.price;
            }
            store.order = store.order.filter((record) => record.amount > 0);
            // 一併更新 total
            store.total = 0;
            store.order.map((el) => store.total += el.subtotal);
            store.addition.map((el) => store.total += el.subtotal);
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // 加入 addition 至 order
        case ActionTypes.ADD_ADDITION_TO_ORDER:
            store.addition.push({
                id: new Date().getTime(),
                name: '',
                amount: 1,
                price: 0,
                subtotal: 0
            });
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // 將 item 從 addition 中移除
        case ActionTypes.REMOVE_ITEM_FROM_ADDITION:
            const additionIdx = store.addition.findIndex((record) => record.id === action.data.id);
            if (additionIdx !== -1) {
                store.addition.splice(additionIdx, 1);
            }
            // 一併更新 total
            store.total = 0;
            store.order.map((el) => store.total += el.subtotal);
            store.addition.map((el) => store.total += el.subtotal);
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // 更新 addition 中的 item
        case ActionTypes.UPADTE_ADDITION_ITEM:
            target = store.addition.find((record) => record.id === action.id);
            if (target) {
                target[action.field] = action.value;
                target.subtotal = target.amount * target.price;
            }
            // 一併更新 total
            store.total = 0;
            store.order.map((el) => store.total += el.subtotal);
            store.addition.map((el) => store.total += el.subtotal);
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // 切換外帶狀態
        case ActionTypes.TOGGLE_TOGO_STATUS:
            store.isToGo = !store.isToGo;
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // 切換 中午/晚上 狀態
        case ActionTypes.TOGGLE_WHEN_STATUS:
            store.when = (store.when === '中午') ? '晚上' : '中午';
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
            // 清空 order & addition records
        case ActionTypes.CLEAR_ORDER_AND_ADDITION:
            store.order = [];
            store.addition = [];
            store.total = 0;
            OrderStore.emit(ActionTypes.CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

export default OrderStore;
