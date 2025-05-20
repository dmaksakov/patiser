import React from "react"
import { Field, reduxForm } from 'redux-form'
import {
	Card,
	CardHeader,
	CardBody,
	Row,
	Col,
	Button,
	Input,
	Label,
	FormGroup,
} from "reactstrap"
import renderTextField from "../../form/elements/textField"
import renderSelectField from "../../form/elements/selectField"
import {connect} from "react-redux";

let IncompleteForm = props => {

	const {handleSubmit, pristine, reset, submitting, profile, measureSystems} = props

	return (
		<React.Fragment>
			<Card>
				<CardBody>
					<h4>Please provide your company information to proceed.</h4>
					<form onSubmit={handleSubmit}>
						<Row>
							<Col sm={12} md={6}>
								<FormGroup>
									<Field
										name="name"
										component={renderTextField}
										type="text"
										label="Company Name"
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col sm={12} md={6}>
								<FormGroup>
									<Field
										name="currency"
										component={renderSelectField}
										label="Currency"
										options={props.currencies}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col sm={12} md={6}>
								<FormGroup>
									<Field
										name="measure_system"
										component={renderSelectField}
										label="Measure system"
										options={measureSystems}
									/>
								</FormGroup>
							</Col>
							<Col className="d-flex justify-content-end flex-wrap mt-2" sm="12">
								<Button.Ripple
									className="mr-1"
									color="success"
									type="submit"
									disabled={pristine || submitting}
								>
									Save Changes
								</Button.Ripple>
								<Button.Ripple
									color="flat-warning"
									type="button"
									disabled={pristine || submitting}
									onClick={reset}
								>
									Reset
								</Button.Ripple>
							</Col>
						</Row>
					</form>
				</CardBody>
			</Card>
		</React.Fragment>
	)
}

IncompleteForm = reduxForm({
	form: 'IncompleteForm',
	enableReinitialize: true
})(IncompleteForm)

IncompleteForm = connect(
	state => ({
		initialValues: state.company.toJS().company
	})
)(IncompleteForm)

export default IncompleteForm
