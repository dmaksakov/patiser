import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	FormGroup, Button, Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderDateField from "../../../form/elements/datePickerField"
import renderTextField from "../../../form/elements/textField"

let CompleteOrderForm = props => {

	const { handleSubmit, loading, handleSidebar } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='completeOrderForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								<Field
									name="completed_at"
									component={renderDateField}
									label="Completed at"
								/>
								<Field
									name="payment_amount"
									component={renderTextField}
									type="number"
									label="Payment received"
								/>
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button disabled={loading} form="completeOrderForm" type="submit" color="primary">
								{loading && <Spinner color="white" size="sm" />}
								<span className="ml-50">{"Complete"}</span>
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

CompleteOrderForm = reduxForm({
	form: 'CompleteOrderForm',
	enableReinitialize: false
})(CompleteOrderForm)

CompleteOrderForm = connect(
	state => ({
		// initialValues: state.orders.toJS().selectedOrder
	}),
	{}
)(CompleteOrderForm)

export default CompleteOrderForm
