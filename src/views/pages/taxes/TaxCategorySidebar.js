import React, {Component} from "react"
import {Button, Spinner} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import taxActions from "../../../redux/taxes/actions"
import {connect} from "react-redux"
import TaxCategoryForm from "./TaxCategoriesForm"
import errorActions from "../../../redux/errors/actions"

const {
	createTaxCategory,
	updateTaxCategory,
} = taxActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class TaxCategorySidebar extends Component {

	addTax = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()

		this.props.createTaxCategory({...values, form: 'TaxCategoryForm'})
	}

	updateTax = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()

		this.props.updateTaxCategory({...values, form: 'TaxCategoryForm'})
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
					<h4>{action === 'edit' ? "Update tax category" : "Add tax category"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<TaxCategoryForm
						{...this.props}
						onSubmit={action === 'add' ? this.addTax : this.updateTax}
					/>
				</PerfectScrollbar>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.taxes.toJS().loading,
		taxCategories: state.taxes.toJS().taxCategories
	}
}

export default connect(mapStateToProps, {
	createTaxCategory,
	updateTaxCategory,
	setShowErrors,
	removeAllErrors,
})(TaxCategorySidebar)
