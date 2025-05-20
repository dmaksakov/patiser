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

let IngredientForm = props => {

	const { handleSubmit, measureUnits, loading, action, handleSidebar } = props

	return (
		<Row className="field-ingredient">
			<Col sm={12}>
				<form id='ingredientForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								<Field
									name="name"
									component={renderTextField}
									type="text"
									label="Name"
								/>
								<Field
									className="field-price"
									name="price"
									component={renderTextField}
									type="number"
									step="0.01"
									label="Price"
								/>
								<Field
									name="amount"
									component={renderTextField}
									type="number"
									step="0.001"
									label="Amount"
								/>
								<Field
									name="measure_unit"
									component={renderSelectField}
									isSearchable={false}
									label="Measure unit"
									options={measureUnits.map(unit => ({
										value: unit.id,
										label: unit.name
									}))}
								/>
							</FormGroup>
						</Col>
						<Col sm={12}>

							<hr className="my-2"/>

							<Button
								disabled={loading}
								form="ingredientForm"
								type="submit"
								color="primary"
							>
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

IngredientForm = reduxForm({
	form: 'IngredientForm',
	enableReinitialize: true,
})(IngredientForm)

IngredientForm = connect(
	state => ({
		initialValues: state.ingredients.toJS().selectedIngredient,
	}),
	{}
)(IngredientForm)

export default IngredientForm
