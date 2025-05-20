import React, {Component} from "react"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import ingredientsActions from "../../../redux/ingredients/actions"
import errorActions from "../../../redux/errors/actions"
import {connect} from "react-redux"
import IngredientForm from "./IngredientForm"

const {
	createIngredientsRequest,
	updateIngredientsRequest,
	selectIngredient,
} = ingredientsActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class IngredientSidebar extends Component {

	constructor(props) {
		super(props)
		this.state = {visible: true}
	}

	saveIngredient = values => {

		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		this.props.createIngredientsRequest({...values, form: 'IngredientForm'})
	}

	updateIngredient = values => {

		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		this.props.updateIngredientsRequest({...values, form: 'IngredientForm'})
	}

	render() {

		let {show, handleSidebar, action, loading} = this.props

		return (
			<div
				className={classnames(" data-list-sidebar", {
					show: show
				})}
			>
				<div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
					<h4>{action === 'edit' ? "Update ingredient" : "Add new ingredient"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<IngredientForm
						{...this.props}
						onSubmit={action === 'add' ? this.saveIngredient : this.updateIngredient}
					/>
				</PerfectScrollbar>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.ingredients.toJS().loading,
		measureUnits: state.company.toJS().companyMeasureUnits,
		errors: state.errors.toJS(),
		showErrors: state.errors.toJS().showErrors,
	}
}

export default connect(mapStateToProps, {
	createIngredientsRequest,
	updateIngredientsRequest,
	selectIngredient,
	setShowErrors,
	removeAllErrors,
})(IngredientSidebar)
