import React from 'react'
import { Field, reduxForm, change } from 'redux-form'
import {
	Row,
	Col,
	FormGroup, Button, Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../../form/elements/textField"
import renderTextareaField from "../../../form/elements/textareaField"
import renderSelectField from "../../../form/elements/selectField"
import commonActions from "../../../../redux/common/actions"

const {
	getMeasureUnitDetails,
} = commonActions

let RecipeDetailsForm = props => {

	const {
		handleSubmit,
		ingredients,
		selectedRecipeItem,
		action,
		getMeasureUnitDetails,
		conversions,
		loading,
		change,
		handleSidebar,
	} = props

	const onChange = ingredient => {
		const ingr = ingredients.filter(i => i.sid === ingredient.value)[0]
		change('measure_unit', {
			label: ingr.measure_unit.name,
			value: ingr.measure_unit.id,
		})
		getMeasureUnitDetails({id: ingr.measure_unit.id})
	}

	return (
		<Row>
			<Col sm={12}>
				<form id='recipeDetailsForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								<Field
									name="ingredient"
									component={renderSelectField}
									label="Ingredient name"
									options={ingredients && ingredients.map(ingredient => ({
										value: ingredient.sid,
										label: ingredient.name
									}))}
									onChange={onChange}
								/>
								<Field
									name="amount"
									component={renderTextField}
									type="number"
									step="0.01"
									label="Amount"
								/>
								{action === 'add' && <Field
									name="measure_unit"
									component={renderSelectField}
									label="Measure unit"
									isSearchable={false}
									options={conversions}
								/>}
								{action === 'edit' && <Field
									name="measure_unit"
									isSearchable={false}
									component={renderSelectField}
									label="Measure unit"
									options={conversions.length && conversions || selectedRecipeItem && selectedRecipeItem.available_measure_units && selectedRecipeItem.available_measure_units.map(unit => ({
										value: unit.id,
										label: unit.name
									}))}
									value={conversions.length ? conversions[0] : ''}
								/>}
								<Field
									name="notes"
									component={renderTextareaField}
									rows={3}
									label="Notes"
								/>
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button disabled={loading} form="recipeDetailsForm" type="submit" color="primary">
								{loading && <Spinner color="white" size="sm" />}
								<span className="ml-50">{action !== 'add' ? "Update" : "Add"}</span>
							</Button>
							<Button
								className="ml-1"
								color="danger"
								outline
								onClick={() => handleSidebar(false, true)}>
								Cancel
							</Button>
						</Col>
					</Row>
				</form>
			</Col>
		</Row>
	)
};

RecipeDetailsForm = reduxForm({
	form: 'RecipeDetailsForm',
	enableReinitialize: true
})(RecipeDetailsForm)

RecipeDetailsForm = connect(
	state => ({
		initialValues: state.recipes.toJS().selectedRecipeItem,
		conversions: state.common.toJS().conversions,
	}),
	{
		getMeasureUnitDetails,
		change,
	}
)(RecipeDetailsForm)

export default RecipeDetailsForm
