import React from 'react';
import ReactDOM from 'react-dom';
import OrderMenu from './components/OrderMenu.jsx';
import OrderContent from './components/OrderContent.jsx';
import OrderActions from './actions/OrderActions';

require("!style!css!sass!./styles/entry.scss");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        OrderActions.loadMenuCategories();
        OrderActions.loadMenuItems();
        OrderActions.loadTables();
    }

    render() {
        return (
            <div id="wrap">
                <div className="order center-container">
                    <div className="center-row">
                        <div className="container-fluid center-container">
                            <OrderMenu/> {/* 左側欄 */}
                            <OrderContent/> {/* 右側欄 */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('app'));
