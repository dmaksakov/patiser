import React, {Component} from "react"
import {Button, Spinner} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import recipesActions from "../../../redux/recipes/actions"
import errorActions from "../../../redux/errors/actions"
import {connect} from "react-redux"
import RecipeForm from "./RecipeForm"

const {
	createRecipesRequest,
	updateRecipesRequest,
} = recipesActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class RecipeSidebar extends Component {

	addRecipe = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		this.props.createRecipesRequest({...values, form: 'RecipeForm'})
	}

	updateRecipe = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		this.props.updateRecipesRequest({...values, form: 'RecipeForm'})
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
					<h4>{action === 'edit' ? "Update recipe" : "Add new recipe"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<RecipeForm
						{...this.props}
						onSubmit={action === 'add' ? this.addRecipe : this.updateRecipe}
					/>
				</PerfectScrollbar>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.recipes.toJS().loading,
	}
}

export default connect(mapStateToProps, {
	createRecipesRequest,
	updateRecipesRequest,
	setShowErrors,
	removeAllErrors,
})(RecipeSidebar)
