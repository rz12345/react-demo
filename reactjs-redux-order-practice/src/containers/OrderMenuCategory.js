import {connect} from 'react-redux'
import {changeCategoryBy} from '../actions/categories'
import {resetMenuPage} from '../actions/pages'
import OrderMenuCategory from '../components/OrderMenuCategory.jsx'

function mapStateToProps(state) {
    return {categories: state.categories.records, selectedId: state.categories.selectedId}
}

function mapDispatchToProps(dispatch) {
    return {
        changeCategoryBy: (index) => dispatch(changeCategoryBy(index)),
        resetMenuPage: () => dispatch(resetMenuPage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderMenuCategory)
