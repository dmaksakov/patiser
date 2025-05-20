import React, {Component} from "react"
import {Button, Spinner} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import productsActions from "../../../redux/products/actions"
import errorActions from "../../../redux/errors/actions"
import {connect} from "react-redux"
import ProductForm from "./ProductForm"

const {
	createProduct,
	updateProduct,
	createVariableProduct,
	updateVariableProduct,
} = productsActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class ProductSidebar extends Component {

	addProduct = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()

		if (values.type === 'variable') {
			this.props.createVariableProduct({...values, form: 'ProductForm'})
		} else {
			this.props.createProduct({...values, form: 'ProductForm'})
		}
	}

	updateProduct = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()

		if (this.props.selectedProduct && this.props.selectedProduct.is_variable) {
			this.props.updateVariableProduct(values)
		} else {
			this.props.updateProduct({...values, form: 'ProductForm'})
		}
	}

	render() {

		let {show, handleSidebar, action, loading} = this.props

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
					<ProductForm
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
		selectedProduct: state.products.toJS().selectedProduct
	}
}

export default connect(mapStateToProps, {
	createProduct,
	updateProduct,
	createVariableProduct,
	updateVariableProduct,
	setShowErrors,
	removeAllErrors,
})(ProductSidebar)
