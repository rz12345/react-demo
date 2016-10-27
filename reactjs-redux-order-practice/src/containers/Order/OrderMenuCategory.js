import {connect} from 'react-redux'
import {changeCategoryBy} from '../../actions/ui/Order/categories'
import {resetMenuPage} from '../../actions/ui/Order/pages'
import OrderMenuCategory from '../../components/Order/OrderMenuCategory.jsx'

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
