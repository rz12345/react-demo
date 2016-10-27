import {connect} from 'react-redux'
import {changeMenuPageBy} from '../../actions/ui/Order/pages'
import {countMenuPage} from '../../helpers'
import OrderMenuPager from '../../components/Order/OrderMenuPager.jsx'

function mapStateToProps(state) {
    return {
        pagesCount: countMenuPage(state.items.records, state.categories.selectedId),
        currentPage: state.pages.currentPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeMenuPageBy: (index) => dispatch(changeMenuPageBy(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderMenuPager)
