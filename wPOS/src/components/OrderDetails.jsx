import React from 'react'

// jsx components
const InputField = require('./InputField.jsx');

class OrderDetails extends React.Component {
    render() {
        const {
            order,
            addition,
            onClickItem,
            onClickDeleteAddition,
            onUpdateAddition,
            divHeight
            } = this.props;

        // 選單內的點單項目
        const OrderElements = order
            ? order.map((el) => (
            <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.amount}</td>
                <td>{el.price}</td>
                <td>{el.subtotal}</td>
                <td>
                    <input type="hidden" name={'orderFromMenu[' + el.id + ']'} value={el.amount}/>
                    <button type="button" className="btn btn-info" onClick={() => onClickItem && onClickItem(el)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        ))
            : '';

        // 加點項目
        const AdditionElements = addition
            ? addition.map((el) => (
            <tr key={el.id}>
                <td><InputField name={'orderFromAddition[' + el.id + '][name]'} value={el.name} type="text"
                                onUpdateAddition={(value) => onUpdateAddition(el.id, 'name', value)}/></td>
                <td><InputField name={'orderFromAddition[' + el.id + '][amount]'} type="number" value={el.amount}
                                onUpdateAddition={(value) => onUpdateAddition(el.id, 'amount', value)}/></td>
                <td><InputField name={'orderFromAddition[' + el.id + '][price]'} type="number" value={el.price}
                                onUpdateAddition={(value) => onUpdateAddition(el.id, 'price', value)}/></td>
                <td>{el.subtotal}</td>
                <td>
                    <InputField name={'orderFromAddition[' + el.id + '][id]'} type="hidden" value={el.id}/>

                    <button type="button" className="btn btn-info" onClick={() => onClickDeleteAddition && onClickDeleteAddition(el)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        ))
            : '';

        // orderDetails 動態高度
        const orderDetailsDivStyle = divHeight
            ? {
            height: divHeight + 'px'
        }
            : {
            height: 'inherit'
        };

        return (
            <div className="order-details" style={orderDetailsDivStyle}>
                <table className="table">
                    <thead>
                    <tr>
                        <th>品項</th>
                        <th>數量</th>
                        <th>單價</th>
                        <th>小計</th>
                        <th>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {OrderElements}
                    {AdditionElements}
                    </tbody>
                </table>
            </div>
        );
    }
}

module.exports = OrderDetails;
