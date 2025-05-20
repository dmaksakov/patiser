import React, {Component} from "react"
import {Button, Spinner} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import categoryActions from "../../../../redux/categories/actions";
import {connect} from "react-redux"
import ProductCategoryForm from "./ProductCategoriesForm"
import errorActions from "../../../../redux/errors/actions"

const {
	createProductCategory,
	updateProductCategory,
} = categoryActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class CategorySidebar extends Component {

	addProduct = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()

		this.props.createProductCategory({...values, form: 'ProductCategoryForm'})
	}

	updateProduct = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()

		this.props.updateProductCategory({...values, form: 'ProductCategoryForm'})
	}

	render() {

		let {show, handleSidebar, action} = this.props

		return (
			<div
				className={classnames("data-list-sidebar", {
					show: show
				})}
			>
				<div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
					<h4>{action === 'edit' ? "Update product category" : "Add product category"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<ProductCategoryForm
						{...this.props}
						onSubmit={action === 'add' ? this.addProduct : this.updateProduct}
					/>
				</PerfectScrollbar>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.categories.toJS().loading,
		productCategories: state.categories.toJS().productCategories
	}
}

export default connect(mapStateToProps, {
	createProductCategory,
	updateProductCategory,
	setShowErrors,
	removeAllErrors,
})(CategorySidebar)
