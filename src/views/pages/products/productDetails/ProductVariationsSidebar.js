import React, {Component} from "react"
import {Button, Col, Row} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import variationsActions from "../../../../redux/variations/actions"
import {connect} from "react-redux"
import ProductVariationsForm from "./ProductVariationsForm"
import errorActions from "../../../../redux/errors/actions";

const {
	createVariations,
	updateVariations,
} = variationsActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class ProductVariationsSidebar extends Component {

	variationAction = values => {
		this.props.removeAllErrors()
		if (this.props.action === 'add') {
			const props = {
				product: this.props.selectedProduct.sid,
				attributes: []
			}
			for (const property in values) {
				if (typeof values[property] === 'object' && values[property] !== null) {
					props.attributes.push({
						sid: property,
						value: values[property].value
					})
				} else {
					props[property] = values[property]
				}
			}
			this.props.createVariations(props)
		} else {
			this.props.setShowErrors(false)
			this.props.updateVariations({
				vid: this.props.selectedVariation.sid,
				name: values.name,
				price: values.price
			})
		}
	}

	render() {

		let {show, handleSidebar, action, selectedProduct, handleAttributeSidebar} = this.props

		return (
			<div
				className={classnames("data-list-sidebar", {
					show: show
				})}
			>
				<div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
					<h4>{action === 'add' ? 'Create variation' : 'Update variation'}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					{selectedProduct.attributes && selectedProduct.attributes.length === 0
						?
							<Row>
								<Col xs={12}>
									This product doesn't have attributes yet.
								</Col>
								<Col xs={12}>
									To add variation please add attributes first.
								</Col>
								<Col xs={12}>
									<div className="text-align-center mt-1">
										<Button
											onClick={() => {
												handleSidebar(false, true)
												handleAttributeSidebar(true, 'add')
											}}
											color="success"
										>
											Add attribute
										</Button>
									</div>
								</Col>
							</Row>
						:
							<ProductVariationsForm
								{...this.props}
								onSubmit={this.variationAction}
							/>
					}
				</PerfectScrollbar>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		selectedVariation: state.variation.toJS().selectedVariation,
		variations: state.products.toJS().productVariations,
	}
}

export default connect(mapStateToProps, {
	createVariations,
	updateVariations,
	setShowErrors,
	removeAllErrors,
})(ProductVariationsSidebar)
