import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	FormGroup, Button, Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../form/elements/textField"
import renderTextareaField from "../../form/elements/textareaField"

let TaxCategoryForm = props => {

	const { handleSubmit, loading, action, handleSidebar } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='taxCategoryForm' onSubmit={handleSubmit}>
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
									name="percentage"
									component={renderTextField}
									type="number"
									step="0.01"
									label="Percentage (%)"
								/>
								<Field
									name="description"
									component={renderTextareaField}
									label="Description"
									rows={3}
								/>
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button  disabled={loading} form="taxCategoryForm" type="submit" color="primary">
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

TaxCategoryForm = reduxForm({
	form: 'TaxCategoryForm',
	enableReinitialize: true
})(TaxCategoryForm)

TaxCategoryForm = connect(
	state => ({
		initialValues: state.taxes.toJS().selectedTaxCategory
	}),
	{}
)(TaxCategoryForm)

export default TaxCategoryForm
