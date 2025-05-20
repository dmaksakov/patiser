import React, {useState} from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	Button,
	FormGroup,
	Badge,
	Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../../form/elements/textField"
import renderSelectField from "../../../form/elements/selectField";

const recipeContext = (recipe, amount, action = 'add') => {
	let resultAmount
	if (action === 'edit') {
		resultAmount = amount ? amount : recipe.amount
	} else {
		resultAmount = amount
	}
	return <Row>
				<Col md={8} className="mt-1">
					<Badge color="success" className="badge-md">Recipe yield</Badge>
				</Col>
				<Col md={4} className="mt-1">
					{recipe.yield + ' ' + recipe.yield_measure_unit}
				</Col>
				<Col md={8} className="mt-1">
					<Badge color="success" className="badge-md">Price per one yield unit:</Badge>
				</Col>
				<Col md={4} className="mt-1 mb-1">
					{recipe.total_cost[0]}{recipe.cost_per_yield}
				</Col>
				<Col md={8} className="mt-1">
					<Badge color="success" className="badge-md">Total cost:</Badge>
				</Col>
				<Col md={4} className="mt-1 mb-1">
					{recipe.total_cost[0]}{(recipe.cost_per_yield * (resultAmount)).toFixed(2)}
				</Col>
		</Row>
}

let ProductRecipesForm = props => {

	const {
		handleSubmit,
		recipes,
		action,
		variation,
		variationLoading,
		loading,
		handleSidebar,
		initialValues,
		amount,
		setRecipeAmount,
		selectedRecipe,
		selectRecipe,
	} = props

	return (
		<Row>
			<Col sm={12}>
				<form id='productRecipesForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								{action === 'add'
									?
										<>
											<Field
												name="recipe"
												component={renderSelectField}
												label="Recipe"
												options={recipes.map(recipe => ({
													value: recipe.sid,
													label: recipe.name,
													yield: recipe.yield,
													yield_measure_unit: recipe.yield_measure_unit.label,
													total_cost: recipe.formatted.total_cost,
													cost_per_yield: (recipe.total_cost / recipe.yield).toFixed(2)
												}))}
												onChange={value => {
													selectRecipe(value)
												}}
											/>
											{selectedRecipe && selectedRecipe.hasOwnProperty('yield') && recipeContext(selectedRecipe, amount)}
										</>
									:
										<>
										{initialValues.recipe && initialValues.recipe.hasOwnProperty('yield') &&
											<>
											<h5>{initialValues.recipe.name}</h5>
												{recipeContext(
												{
														...initialValues,
														yield: initialValues.recipe.yield,
														yield_measure_unit: initialValues.recipe.yield_measure_unit.name,
														total_cost: initialValues.recipe.total_cost_formatted,
														cost_per_yield: (initialValues.recipe.total_cost / initialValues.recipe.yield).toFixed(2)
														},
														amount,
														'edit'
												)}
											</>
										}
										</>
								}


								{selectedRecipe && <Field
									name="amount"
									component={renderTextField}
									type="number"
									step="0.001"
									label={"Amount " + (selectedRecipe.yield_measure_unit ? '(' + selectedRecipe.yield_measure_unit + ')' : '')}
									onChange={(e) => setRecipeAmount(e.target.value)}
								/>}
								<Field
									name="notes"
									component={renderTextField}
									type="text"
									label="Notes"
								/>
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button disabled={variation ? variationLoading : loading} form="productRecipesForm" type="submit" color="primary">
								{(variation ? variationLoading : loading) && <Spinner color="white" size="sm" />}
								<span className="ml-50">{action !== 'add' ? "Update" : "Add"}</span>
							</Button>
							<Button
								className="ml-1"
								color="danger"
								outline
								onClick={() => handleSidebar(false, true)}
							>
								Cancel
							</Button>
						</Col>
					</Row>
				</form>
			</Col>
		</Row>
	)
};

ProductRecipesForm = reduxForm({
	form: 'ProductRecipesForm',
	enableReinitialize: true
})(ProductRecipesForm)

ProductRecipesForm = connect(
	state => ({
		initialValues: state.products.toJS().selectedRecipe,
		variationLoading: state.variation.toJS().loading,
	}),
	{}
)(ProductRecipesForm)

export default ProductRecipesForm
