import React, {Component} from 'react';

const OrderContentTotal = (props) => (
    <div className="panel panel-default text-center total">
        <div className="title">
            總計
        </div>
        <div className="value">
            {props.total}
        </div>
    </div>
);

export default OrderContentTotal;
