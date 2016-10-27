import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchCategoryData, fetchItemData, fetchTableData} from '../actions/data'
import OrderMenu from '../components/Order/OrderMenu.jsx'
import OrderContent from '../containers/Order/OrderContent'

class App extends Component {
    componentDidMount() {
        const {fetchCategoryData, fetchItemData, fetchTableData} = this.props
        fetchCategoryData()
        fetchItemData()
        fetchTableData()
    }

    render() {
        return (
            <div id="wrap">
                <div className="order center-container">
                    <div className="center-row">
                        <div className="container-fluid center-container">
                            <OrderMenu/> {/* 左側欄 */}
                            <OrderContent/>{/* 右側欄 */}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
App.propTypes = {
    fetchCategoryData: PropTypes.func.isRequired,
    fetchItemData: PropTypes.func.isRequired,
    fetchTableData: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCategoryData: () => dispatch(fetchCategoryData()),
        fetchItemData: () => dispatch(fetchItemData()),
        fetchTableData: () => dispatch(fetchTableData())
    }
}

export default connect(undefined, mapDispatchToProps)(App)
