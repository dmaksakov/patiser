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
import renderSelectField from "../../form/elements/selectField"
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

let OrderForm = props => {

	const { handleSubmit, allCustomers, orderStatuses, action, loading, handleSidebar, profile } = props

	return (
		<Row className="form-order">
			<Col sm={12}>
				<form id='orderForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup className="order-form">
								<Field
									name="customer"
									component={renderSelectField}
									label="Customer"
									options={allCustomers ? allCustomers.map(customer => ({
										value: customer.sid,
										label: customer.first_name + ' ' + customer.last_name
									})) : []}
								/>
								<Field
									name="handling_shipping"
									component={renderTextField}
									type="number"
									label={'Shipping and handling (' + (profile.company && profile.company.currency && profile.company.currency.code) + ')'}
								/>
								<Field
									name="notes"
									component={renderTextareaField}
									rows="3"
									label="Notes"
								/>
								{action !== 'add' && <Field
									name="status"
									component={renderSelectField}
									isSearchable={false}
									label="Status"
									options={orderStatuses ? orderStatuses.map(status => ({
										value: status.id,
										label: status.name
									})) : []}
								/>}
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button disabled={loading} form="orderForm" type="submit" color="primary">
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

OrderForm = reduxForm({
	form: 'OrderForm',
	enableReinitialize: true
})(OrderForm)

OrderForm = connect(
	state => ({
		initialValues: state.orders.toJS().selectedOrder,
		profile: state.account.toJS().profile,
	}),
	{}
)(OrderForm)

export default OrderForm
