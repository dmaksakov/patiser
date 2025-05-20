import React, {Component} from "react"
import {Button, Spinner} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import recipesActions from "../../../../redux/recipes/actions"
import ingredientsActions from "../../../../redux/ingredients/actions"
import {connect} from "react-redux"
import RecipeDetailsForm from "./RecipeDetailsForm"
import errorActions from "../../../../redux/errors/actions"

const {
	createRecipeItem,
	updateRecipeItem,
} = recipesActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

const {
	getAllIngredientsRequest,
} = ingredientsActions

class RecipeDetailsSidebar extends Component {

	componentDidMount() {
		this.props.getAllIngredientsRequest()
	}

	addRecipeItem = values => {
		const props = {
			...values,
			ingredient: values.ingredient ? values.ingredient.value : '',
			measure_unit: values.measure_unit ? values.measure_unit.value : '',
			sid: this.props.match.params.sid,
		}
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		this.props.createRecipeItem({...props, form: 'RecipeDetailsForm'})
	}

	updateRecipeItem = values => {

		const props = {
			...values,
			iid: values.ingredient ? values.ingredient.value : '',
			measure_unit: values.measure_unit ? values.measure_unit.value : '',
			rid: this.props.match.params.sid,
			riid: values.sid,
		}
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		this.props.updateRecipeItem({...props, form: 'RecipeDetailsForm'})
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
					<h4>{action === 'edit' ? "Update recipe item" : "Add item to recipe"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<RecipeDetailsForm
						{...this.props}
						onSubmit={action === 'add' ? this.addRecipeItem : this.updateRecipeItem}
					/>
				</PerfectScrollbar>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.recipes.toJS().loading,
		ingredients: state.ingredients.toJS().allIngredients
	}
}

export default connect(mapStateToProps, {
	createRecipeItem,
	updateRecipeItem,
	getAllIngredientsRequest,
	setShowErrors,
	removeAllErrors,
})(RecipeDetailsSidebar)
