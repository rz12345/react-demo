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
} from '../actions/order'
import {
    calculateTotalBy
} from '../helpers'
import OrderConstants from '../constants/OrderConstants'

export default function order(state = {
    orderContentStyle: {
        height: 'inherit'
    },
    items: [],
    additions: [],
    isToGo: false,
    when: OrderConstants.whenStatus,
    total: 0
}, action) {
    let _items, _additions
    switch (action.type) {
        case ADD_ITEM_TO_ORDER:
            if (state.items.find((item) => item.id == action.item.id)) {
                _items = state.items.map(item => {
                    if (item.id == action.item.id) {
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
            _items = [...state.items, {
                id: action.item.id,
                name: action.item.name,
                amount: 1,
                price: action.item.price,
                subtotal: action.item.price
            }]
            return Object.assign({}, state, {
                items: _items,
                total: calculateTotalBy(_items, state.additions)
            })
        case REMOVE_ITEM_FROM_ORDER:
            _items = state.items.map(item => {
                if (item.id == action.item.id) {
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
        case ADD_ADDITION_TO_ORDER:
            return Object.assign({}, state, {
                additions: [...state.additions, {
                    id: new Date().getTime(),
                    name: '',
                    amount: 1,
                    price: 0,
                    subtotal: 0
                }]
            })
        case REMOVE_ADDITION_FROM_ORDER:
            _additions = state.additions.filter((addition) => addition.id !== action.addition.id)
            return Object.assign({}, state, {
                additions: _additions,
                total: calculateTotalBy(state.items, _additions)
            })
        case UPADTE_ADDITION:
            _additions = state.additions.map(addition => {
                if (addition.id == action.addition.id) {
                    return Object.assign({}, addition, {
                        id: action.addition.id,
                        name: action.addition.name,
                        amount: action.addition.amount,
                        price: action.addition.price,
                        subtotal: action.addition.amount * action.addition.price
                    })
                }
                return addition
            })
            return Object.assign({}, state, {
                additions: _additions,
                total: calculateTotalBy(state.items, _additions)
            })
        case TOGGLE_TOGO_STATUS:
            return Object.assign({}, state, {
                isToGo: !state.isToGo,
            })
        case TOGGLE_WHEN_STATUS:
            return Object.assign({}, state, {
                when: (state.when === '中午') ? '晚上' : '中午',
            })
        case SUBMIT_ORDER:
            // console.log('--- dump order ---')
            // console.log({
            //     items: state.items,
            //     additions: state.additions,
            //     total: state.total
            // })
            console.log('--- clear order ---')
            return Object.assign({}, state, {
                items: [],
                additions: [],
                total: 0
            })
        case UPDATE_ORDER_STYLE:
            return Object.assign({}, state, {
                orderContentStyle: action.style
            })
        default:
            return state
    }
}
