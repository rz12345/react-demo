import React, {PropTypes} from 'react'

const OrderMenuCategory = ({categories, selectedId, changeCategoryBy, resetMenuPage}) => (
    <div className="category">
        <ul className="nav nav-pills nav-justified">
            {categories.map((category) => (
                <li key={category.id} role="presentation" className={selectedId === category.id
                    ? "active"
                    : ""} onClick={() => changeCategoryBy(category.id) && resetMenuPage()}>
                    <a href="#">
                        <h2>{category.name}</h2>
                    </a>
                </li>
            ))}
        </ul>
    </div>
)
OrderMenuCategory.propTypes = {
    categories: PropTypes.array.isRequired,
    selectedId: PropTypes.number.isRequired,
    changeCategoryBy: PropTypes.func.isRequired,
    resetMenuPage: PropTypes.func.isRequired
}

export default OrderMenuCategory
