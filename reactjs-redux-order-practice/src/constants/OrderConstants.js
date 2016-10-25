const now = new Date();
const nightStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 30, 0, 0);
const whenStatus = (now.getTime() - nightStart.getTime() < 0) ? '中午' : '晚上';

const OrderConstants = {
    // parameters
    itemsPerPageAmount: 12, // 每頁菜單項目數
    menuItemListRows: 3, // 菜單列數
    menuItemRowMarginHeight: 30, // 菜單列與列之間 margin 高
    menuCategoryListHeight: 87, // 菜單分類 DOM 高
    menuPagerHeight: 62, // 菜單分頁 DOM 高
    contentDetailHeadingHeight: 72, // "點單明細" 高
    contentOperationHeight: 133, // order 操作區域高
    // store default value
    whenStatus: whenStatus // 菜單 中午/晚上的狀態
};

export default OrderConstants;
