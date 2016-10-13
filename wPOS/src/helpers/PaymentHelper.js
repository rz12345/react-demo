class PaymentHelper {
    // 取得 payment 的摘要資訊
    static getPaymentSummary(payment){
        // 這邊只要品名跟數量就好
        const data = payment.map((item) => item.name + ': ' + item.amount);
        return data.join(', ');
    }

    // 傳回該分類的 items
    static getItemsByCategory(items, category) {
        return items.filter((item) => item.category === category);
    }

    // 傳回該分頁的 items
    static getItemsByPage(items, idx) {
        return items[idx];
    }

    // 新增項目至明細表中
    static addItemToOrder(order, item) {
        const target = order.find((el) => el.id === item.id);
        if (target) {
            // 已在 order 內, 更新 obj 的 amount & subtotal
            target.amount += 1;
            target.subtotal = target.amount * target.price;
        } else {
            // 若不在 order 內, 產生新 obj
            order.push({
                id: item.id,
                name: item.name,
                amount: 1,
                price: item.price,
                subtotal: 1 * item.price
            });
        }
        return order;
    }

    // 從明細表中移除項目
    static deleteItemFromOrder(order, item) {
        const target = order.find((el) => el.id === item.id);
        if (target) {
            target.amount -= 1;
            target.subtotal = target.amount * target.price;
        }
        return order.filter((el) => el.amount > 0);
    }

    // 新增加點項目
    static addAdditionToOrder(addition) {
        addition.push({
            id: new Date().getTime(),
            name: '',
            amount: 1,
            price: 0,
            subtotal: 0
        });
        return addition;
    }

    // 更新加點項目
    static updateAddition(addition, id, key, value) {
        const target = addition.find((el) => el.id === id);
        if (target) {
            target[key] = value;
            target.subtotal = target.amount * target.price;
        }
        return addition;
    }

    // 刪除加點項目
    static deleteAdditionFromOrder(addition, item) {
        const idx = addition.findIndex((el) => el.id === item.id);
        if (idx !== -1)
            addition.splice(idx, 1);
        return addition;
    }
}

module.exports = PaymentHelper;
