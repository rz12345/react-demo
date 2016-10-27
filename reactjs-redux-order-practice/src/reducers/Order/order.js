import {
    handleActions
} from 'redux-actions'
import {
    ADD_ITEM_TO_ORDER,
    REMOVE_ITEM_FROM_ORDER,
    ADD_ADDITION_TO_ORDER,
    REMOVE_ADDITION_FROM_ORDER,
    UPADTE_ADDITION,
    UPDATE_ORDER_STYLE,
    TOGGLE_TOGO_STATUS,
    TOGGLE_WHEN_STATUS,
    SUBMIT_ORDER
} from '../../constants/ActionTypes'
import {
    calculateTotalBy
} from '../../helpers'
import OrderConstants from '../../constants/OrderConstants'

export default handleActions({
    ADD_ITEM_TO_ORDER: (state, {
        payload
    }) => {
        if (state.items.find((item) => item.id == payload.id)) {
            let _items = state.items.map(item => {
                if (item.id == payload.id) {
                    return Object.assign({}, item, {
                        amount: item.amount + 1,
                        subtotal: (item.amount + 1) * item.price
                    })
                }
                return item
            })
            return Object.assign({}, state, {
                items: _items,
                total: calculateTotalBy(_items, state.additions)
            })
        }
        let _items = [...state.items, {
            id: payload.id,
            name: payload.name,
            amount: 1,
            price: payload.price,
            subtotal: payload.price
        }]
        return Object.assign({}, state, {
            items: _items,
            total: calculateTotalBy(_items, state.additions)
        })
    },
    REMOVE_ITEM_FROM_ORDER: (state, {
        payload
    }) => {
        let _items = state.items.map(item => {
            if (item.id == payload.id) {
                return Object.assign({}, item, {
                    amount: item.amount - 1,
                    subtotal: (item.amount - 1) * item.price
                })
            }
            return item
        }).filter((item) => item.amount > 0)
        return Object.assign({}, state, {
            items: _items,
            total: calculateTotalBy(_items, state.additions)
        })
    },
    ADD_ADDITION_TO_ORDER: (state) => {
        return Object.assign({}, state, {
            additions: [...state.additions, {
                id: Date.now(),
                name: '',
                amount: 1,
                price: 0,
                subtotal: 0
            }]
        })
    },
    REMOVE_ADDITION_FROM_ORDER: (state, {
        payload
    }) => {
        let _additions = state.additions.filter((addition) => addition.id !== payload.id)
        return Object.assign({}, state, {
            additions: _additions,
            total: calculateTotalBy(state.items, _additions)
        })
    },
    UPADTE_ADDITION: (state, {
        payload
    }) => {
        let _additions = state.additions.map(addition => {
            if (addition.id == payload.id) {
                return Object.assign({}, addition, {
                    id: payload.id,
                    name: payload.name,
                    amount: payload.amount,
                    price: payload.price,
                    subtotal: payload.amount * payload.price
                })
            }
            return addition
        })
        return Object.assign({}, state, {
            additions: _additions,
            total: calculateTotalBy(state.items, _additions)
        })
    },
    TOGGLE_TOGO_STATUS: (state) => {
        return Object.assign({}, state, {
            isToGo: !state.isToGo,
        })
    },
    TOGGLE_WHEN_STATUS: (state) => {
        return Object.assign({}, state, {
            when: (state.when === '中午') ? '晚上' : '中午',
        })
    },
    SUBMIT_ORDER: (state) => {
        console.log('--- clear order ---')
        return Object.assign({}, state, {
            items: [],
            additions: [],
            total: 0
        })
    },
    UPDATE_ORDER_STYLE: (state, {
        payload
    }) => {
        return Object.assign({}, state, {
            orderContentStyle: payload
        })
    },
    TOGGLE_WHEN_STATUS: (state) => {
        return Object.assign({}, state, {
            when: (state.when === '中午') ? '晚上' : '中午',
        })
    },
    TOGGLE_WHEN_STATUS: (state) => {
        return Object.assign({}, state, {
            when: (state.when === '中午') ? '晚上' : '中午',
        })
    },
}, {
    orderContentStyle: {
        height: 'inherit'
    },
    items: [],
    additions: [],
    isToGo: false,
    when: OrderConstants.whenStatus,
    total: 0
})
