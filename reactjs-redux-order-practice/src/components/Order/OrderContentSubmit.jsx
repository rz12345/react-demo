import React, {Component, PropTypes} from 'react'

const OrderContentSubmit = ({
    order,
    isToGo,
    when,
    tables,
    total,
    addAdditionToOrder,
    toggleToGoStatus,
    toggleWhenStatus,
    sumbitOrder
}) => (
    <div className="row">
        <div className="col-md-6 nopadding">
            <div className="col-md-12 nopadding">
                {/* 加點 */}
                <div className="col-md-6 nopadding">
                    <button type="button" className="btn btn-info btn-lg btn-block" onClick={() => addAdditionToOrder()}>
                        <strong>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            加點</strong>
                    </button>
                </div>
                {/* 外帶 */}
                <div className="col-md-6 nopadding">
                    <button type="button" className={(isToGo
                        ? 'btn btn-danger'
                        : 'btn btn-success') + ' btn-lg btn-block'} onClick={() => toggleToGoStatus()}>
                        <strong>
                            <i className={(isToGo)
                                ? 'fa fa-hand-o-right'
                                : 'fa fa-cutlery'} aria-hidden="true"></i>
                            {isToGo
                                ? '外帶'
                                : '內用'}</strong>
                    </button>
                </div>
                {/* 時段 */}
                <div className="col-md-6 nopadding">
                    <button type="button" className={(when === '中午'
                        ? 'btn btn-warning'
                        : 'btn btn-primary') + ' btn-lg btn-block'} onClick={() => toggleWhenStatus()}>
                        <strong>
                            <i className={(when === '中午')
                                ? 'fa fa-sun-o'
                                : 'fa fa-moon-o'} aria-hidden="true"></i>
                            {when}</strong>
                    </button>
                </div>
                {/* 桌號 */}
                <div className="col-md-6 nopadding">
                    <select className="form-control" name="table" disabled={isToGo
                        ? 'disabled'
                        : ''}>
                        {isToGo
                            ? (
                                <option value="null">外帶</option>
                            )
                            : tables.map((table) => (
                                <option key={table.id} value={table.id}>
                                    {table.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
        </div>
        <div className="col-md-3 nopadding">
            {/* 送單 */}
            <button type="submit" className="btn btn-info btn-lg btn-block" disabled={order.length == 0
                ? 'disabled'
                : ''} onClick={() => sumbitOrder()}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i><br/>送單
            </button>
        </div>
        <div className="col-md-3 nopadding">
            {/* 總計 */}
            <div className="panel panel-default text-center total">
                <div className="title">
                    總計
                </div>
                <div className="value">
                    {total}
                </div>
            </div>
        </div>
    </div>
)
OrderContentSubmit.propTypes = {
    order: PropTypes.array.isRequired,
    isToGo: PropTypes.bool.isRequired,
    when: PropTypes.string.isRequired,
    tables: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    addAdditionToOrder: PropTypes.func.isRequired,
    toggleToGoStatus: PropTypes.func.isRequired,
    toggleWhenStatus: PropTypes.func.isRequired,
    sumbitOrder: PropTypes.func.isRequired
}

export default OrderContentSubmit
