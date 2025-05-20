import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	FormGroup, Button, Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../form/elements/textField"
import renderSelectField from "../../form/elements/selectField"

let RecipeForm = props => {

	const { handleSubmit, measureUnits, loading, action, handleSidebar, profile } = props
	return (
		<Row className="form-recipe">
			<Col sm={12}>
				<form id='recipeForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								<Field
									className="field-recipe"
									name="name"
									component={renderTextField}
									type="text"
									label="Name"
								/>
								<Field
									name="labor_time"
									component={renderTextField}
									type="number"
									step="0.01"
									label="Labor time (hours)"
								/>
								<Field
									name="yield"
									component={renderTextField}
									type="number"
									step="0.01"
									label="Yield"
								/>
								<Field
									name="yield_measure_unit"
									component={renderSelectField}
									isSearchable={false}
									label="Yield measure unit"
									options={measureUnits && measureUnits.map(unit => ({
										value: unit.id,
										label: unit.name
									}))}
								/>
								<Field
									name="expenses"
									component={renderTextField}
									type="number"
									step="0.01"
									label={"Expenses (" + (profile.company && profile.company.currency && profile.company.currency.code) + ")"}
								/>
							</FormGroup>
						</Col>
						<Col sm={12}>

							<hr className="my-2" />

							<Button disabled={loading} form="recipeForm" type="submit" color="primary">
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

RecipeForm = reduxForm({
	form: 'RecipeForm',
	enableReinitialize: true
})(RecipeForm)

RecipeForm = connect(
	state => ({
		initialValues: state.recipes.toJS().selectedRecipe,
		profile: state.account.toJS().profile,
	}),
	{}
)(RecipeForm)

export default RecipeForm
