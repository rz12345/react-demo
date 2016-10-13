const OrderActions = {
    addItemToOrder(order, item) {
        let target = order.find((record) => record.id === item.id);
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
    },
    removeItemFromOder(order, item) {
        let target = order.find((record) => record.id === item.id);
        if (target) {
            target.amount -= 1;
            target.subtotal = target.amount * target.price;
        }
        order = order.filter((record) => record.amount > 0);
        return order;
    },
    addAdditionToOrder(addition) {
        addition.push({
            id: new Date().getTime(),
            name: '',
            amount: 1,
            price: 0,
            subtotal: 0
        });
        return addition;
    },
    removeItemFromAddition(addition, item) {
        const additionIdx = addition.findIndex((record) => record.id === item.id);
        if (additionIdx !== -1) {
            addition.splice(additionIdx, 1);
        }
        return addition;
    },
    updateAdditionItem(addition, item) {
        let target = addition.find((record) => record.id === item.id);
        if (target) {
            target.name = item.name;
            target.amount = item.amount;
            target.price = item.price;
            target.subtotal = item.amount * item.price;
        }
        return addition;
    },
    updateTotal(order, addition) {
        let total = 0;
        order.map((el) => total += el.subtotal);
        addition.map((el) => total += el.subtotal);
        return total;
    },
    toggleWhenStatus(when) {
        return (when === '中午') ? '晚上' : '中午';
    },
    toggleIsToGoStatus(isToGo) {
        return !isToGo;
    }
};

export default OrderActions;
