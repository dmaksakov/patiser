import React, {Component} from "react"
import {Button} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import productsActions from "../../../../redux/products/actions"
import {connect} from "react-redux"
import ProductAttributesForm from "./ProductAttributesForm"
import errorActions from "../../../../redux/errors/actions";

const {
	addProductAttribute,
	updateProductAttribute,
	createVariableProductAttribute,
	updateVariableProductAttribute,
	deleteVariableProductAttribute,
} = productsActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class ProductAttributesSidebar extends Component {

	addAttribute = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		if (this.props.selectedProduct.is_variable) {
			this.props.createVariableProductAttribute({
				name: values.name,
				values: values.values ? values.values.join('|') : '',
				pid: this.props.selectedProduct.sid,
				defaultValue: values.values ? values.values[0] : ''
			})
		} else {
			this.props.addProductAttribute({
				name: values.name,
				value: values.value,
				pid: this.props.selectedProduct.sid
			})
		}
	}

	updateAttribute = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		if (this.props.selectedProduct.is_variable) {

			this.props.updateVariableProductAttribute({
				name: values.name,
				pid: this.props.selectedProduct.sid,
				aid: this.props.selectedAttribute.sid,
			})
		} else {
			this.props.updateProductAttribute({
				...values,
				pid: this.props.selectedProduct.sid
			})
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
					<h4>{action === 'edit' ? "Update product attribute" : "Add new attribute"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<ProductAttributesForm
						{...this.props}
						onSubmit={action === 'add' ? this.addAttribute : this.updateAttribute}
					/>
				</PerfectScrollbar>

				<div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">

				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.products.toJS().loading,
		selectedProduct: state.products.toJS().selectedProduct,
		selectedAttribute: state.products.toJS().selectedAttribute,
	}
}

export default connect(mapStateToProps, {
	addProductAttribute,
	updateProductAttribute,
	createVariableProductAttribute,
	deleteVariableProductAttribute,
	updateVariableProductAttribute,
	setShowErrors,
	removeAllErrors,
})(ProductAttributesSidebar)
