import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	FormGroup, Button,
} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../../form/elements/textField"
import renderTextareaField from "../../../form/elements/textareaField"
import renderSelectField from "../../../form/elements/selectField";

let OrderItemForm = props => {

	const { handleSubmit, variations, orderItems, action, loading, handleSidebar } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='orderItemForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								{action === 'add' && <Field
									name="variation"
									component={renderSelectField}
									label="Product Variation"
									options={variations ? variations.map(variation => ({
										value: variation.sid,
										label: variation.name
									})) : []}
								/>}
								<Field
									name="amount"
									component={renderTextField}
									type="number"
									label="Amount"
								/>
								{action === 'edit' && <Field
									name="notes"
									component={renderTextareaField}
									rows="3"
									label="Notes"
								/>}
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button form="orderItemForm" type="submit" color="primary">
								{action !== 'add' ? "Update" : "Add"}
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

OrderItemForm = reduxForm({
	form: 'OrderItemForm',
	enableReinitialize: true
})(OrderItemForm)

OrderItemForm = connect(
	state => ({
		initialValues: state.orders.toJS().selectedOrderItem
	}),
	{}
)(OrderItemForm)

export default OrderItemForm
