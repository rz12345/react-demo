import React, {Component, PropTypes} from 'react'

const OrderContentDetail = ({items, additions, removeItemFromOrder, removeAdditionFromOrder, updateAddition}) => (
    <table className="table">
        <thead>
            <tr>
                <th>品項</th>
                <th>數量</th>
                <th>單價</th>
                <th>小計</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {items.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                    <td>{item.price}</td>
                    <td>{item.subtotal}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={() => removeItemFromOrder(item)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            ))}
            {additions.map((addition) => (
                <tr key={addition.id}>
                    <td><input type="text" className="form-control" defaultValue={addition.name} onChange={(e) => updateAddition(Object.assign({}, addition, {name: e.target.value}))}/></td>
                    <td><input type="number" className="form-control" defaultValue={addition.amount} onChange={(e) => updateAddition(Object.assign({}, addition, {amount: e.target.value}))}/></td>
                    <td><input type="number" className="form-control" defaultValue={addition.price} onChange={(e) => updateAddition(Object.assign({}, addition, {price: e.target.value}))}/></td>
                    <td>{addition.subtotal}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={(e) => removeAdditionFromOrder(addition)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)
OrderContentDetail.propTypes = {
    items: PropTypes.array.isRequired,
    additions: PropTypes.array.isRequired,
    removeItemFromOrder: PropTypes.func.isRequired,
    removeAdditionFromOrder: PropTypes.func.isRequired,
    updateAddition: PropTypes.func.isRequired
}

export default OrderContentDetail
