import React, {Component} from "react"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import productsActions from "../../../../redux/products/actions"
import variationActions from "../../../../redux/variations/actions"
import {connect} from "react-redux"
import ProductImagesForm from "./ProductImagesForm"
import errorActions from "../../../../redux/errors/actions";

const {
	updateSimpleProductImages,
} = productsActions

const {
	updateVariationsImage,
} = variationActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class ProductImagesSidebar extends Component {

	updateImage = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		if (this.props.variation) {
			this.props.updateVariationsImage({
				...values,
				vid: this.props.selectedVariation.sid,
				aid: this.props.selectedProductImage.sid
			})
		} else {
			this.props.updateSimpleProductImages({
				...values,
				pid: this.props.selectedProduct.sid
			})
		}
	}

	render() {

		let {show, handleSidebar, action, images} = this.props

		return (
			<div
				className={classnames("data-list-sidebar", {
					show: show
				})}
			>
				<div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
					<h4>Update product image</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<ProductImagesForm
						{...this.props}
						onSubmit={this.updateImage}
					/>
				</PerfectScrollbar>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.products.toJS().loading,
		selectedProduct: state.products.toJS().selectedProduct,
		selectedVariation: state.variation.toJS().selectedVariation,
		images: state.products.toJS().productImages,
	}
}

export default connect(mapStateToProps, {
	updateSimpleProductImages,
	updateVariationsImage,
	setShowErrors,
	removeAllErrors,
})(ProductImagesSidebar)
