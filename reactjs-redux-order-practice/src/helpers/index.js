import OrderConstants from '../constants/OrderConstants'

export function countMenuPage(items, categoryId) {
    const _items = items.filter((item) => item.category_id == categoryId)
    return Math.ceil(_items.length / OrderConstants.itemsPerPageAmount)
}

export function filterItemsBy(items, categoryId, pageId) {
    const _items = items.filter(item => item.category_id == categoryId)
    return _items.filter((record, i) => {
        return OrderConstants.itemsPerPageAmount * (pageId) <= i && i < OrderConstants.itemsPerPageAmount * (1 + pageId)
    })
}

export function getItemRowStyle() {
    const bodyHeight = document.body.clientHeight
    const rowHeight = (bodyHeight - OrderConstants.menuItemRowMarginHeight - OrderConstants.menuCategoryListHeight - OrderConstants.menuPagerHeight) / OrderConstants.menuItemListRows
    return {
        height: rowHeight + 'px'
    }
}

export function getOrderContentStyle() {
    const bodyHeight = document.body.clientHeight;
    const contentHeight = (bodyHeight - OrderConstants.contentDetailHeadingHeight - OrderConstants.contentOperationHeight);
    return {
        height: contentHeight + 'px'
    }
}

export function calculateTotalBy(items, additions) {
    let total = 0;
    items.map((record) => total += record.subtotal)
    additions.map((record) => total += record.subtotal)
    return total
}
