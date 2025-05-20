import React, {Component} from "react"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import productsActions from "../../../../redux/products/actions"
import {connect} from "react-redux"
import ProductRecipesForm from "./ProductRecipesForm"
import recipeActions from "../../../../redux/recipes/actions"
import variationActions from "../../../../redux/variations/actions"
import errorActions from "../../../../redux/errors/actions";

const {
	addProductRecipe,
	updateProductRecipe,
} = productsActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

const {
	getRecipesRequest,
} = recipeActions

const {
	createVariationsRecipe,
	updateVariationsRecipe,
} = variationActions

class ProductRecipesSidebar extends Component {

	componentDidMount() {
		this.props.getRecipesRequest()
	}

	addRecipe = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		if (this.props.variation) {
			this.props.createVariationsRecipe(
		{
					...values,
					vid: this.props.selectedVariation.sid,
					pid: this.props.selectedProduct.sid,
					form: 'ProductRecipeForm'
				},

			)
		} else {
			this.props.addProductRecipe({
				...values,
				pid: this.props.selectedProduct.sid,
				// form: 'ProductRecipeForm'
			})
		}
	}

	updateRecipe = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		if (this.props.variation) {
			this.props.updateVariationsRecipe({
				...values,
				vid: this.props.selectedVariation.sid,
				rid: values.recipe.sid,
				sid: this.props.selectedProduct.sid
			})
		} else {
			this.props.updateProductRecipe({
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
					<h4>{action === 'edit' ? "Update product recipe" : "Add new recipe"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<ProductRecipesForm
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
		loading: state.products.toJS().loading,
		selectedProduct: state.products.toJS().selectedProduct,
		recipes: state.recipes.toJS().recipes,
	}
}

export default connect(mapStateToProps, {
	addProductRecipe,
	updateProductRecipe,
	getRecipesRequest,
	createVariationsRecipe,
	updateVariationsRecipe,
	setShowErrors,
	removeAllErrors,
})(ProductRecipesSidebar)
