import React, {Component} from "react"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import productsActions from "../../../../redux/products/actions"
import {connect} from "react-redux"
import ProductDetailsForm from "../ProductForm"
import errorActions from "../../../../redux/errors/actions";

const {
	createProduct,
	updateProduct,
	updateVariableProduct,
} = productsActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class ProductDetailsSidebar extends Component {

	addProduct = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		const props = {
			...values,
		}
		this.props.createProduct(props)
	}

	updateProduct = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		const props = {
			...values,
		}
		if (this.props.selectedProduct.is_variable) {
			this.props.updateVariableProduct(props)
		} else {
			this.props.updateProduct(props)
		}
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
					<h4>{action === 'edit' ? "Update product" : "Add new product"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<ProductDetailsForm
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
		loading: state.products.toJS().loading,
		productCategories: state.categories.toJS().productCategories,
		selectedProduct: state.products.toJS().selectedProduct,
	}
}

export default connect(mapStateToProps, {
	createProduct,
	updateProduct,
	updateVariableProduct,
	setShowErrors,
	removeAllErrors,
})(ProductDetailsSidebar)
