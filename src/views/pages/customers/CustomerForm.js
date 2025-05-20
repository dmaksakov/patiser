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

let CustomerForm = props => {

	const { handleSubmit, loading, action, handleSidebar } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='customerForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								<Field
									name="first_name"
									component={renderTextField}
									type="text"
									label="First Name"
								/>
								<Field
									name="last_name"
									component={renderTextField}
									type="text"
									label="Last Name"
								/>
								<Field
									name="email"
									component={renderTextField}
									type="email"
									label="Email"
								/>
								<Field
									name="phone"
									component={renderTextField}
									type="number"
									label="Phone"
								/>
								<Field
									name="notes"
									component={renderTextareaField}
									label="Notes"
									rows={3}
								/>
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button disabled={loading} form="customerForm" type="submit" color="primary">
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

CustomerForm = reduxForm({
	form: 'CustomerForm',
	enableReinitialize: true
})(CustomerForm)

CustomerForm = connect(
	state => ({
		initialValues: state.customers.toJS().selectedCustomer
	}),
	{}
)(CustomerForm)

export default CustomerForm
