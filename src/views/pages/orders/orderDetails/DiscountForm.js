import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	FormGroup, Button, Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../../form/elements/textField"
import renderSelectField from "../../../form/elements/selectField";

let DiscountForm = props => {

	const { handleSubmit, discountTypes, action, loading, handleSidebar } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='discountForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								<Field
									name="type"
									component={renderSelectField}
									isSearchable={false}
									label="Discount Type"
									options={discountTypes ? discountTypes.map(type => ({
										value: type.id,
										label: type.name
									})) : []}
								/>
								<Field
									name="value"
									component={renderTextField}
									type="number"
									label="Value"
								/>
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button disabled={loading} form="discountForm" type="submit" color="primary">
								{loading && <Spinner color="white" size="sm" />}
								<span className="ml-50">Apply</span>
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

DiscountForm = reduxForm({
	form: 'DiscountForm',
	enableReinitialize: true
})(DiscountForm)

DiscountForm = connect(
	state => ({
		initialValues: state.orders.toJS().selectedDiscount
	}),
	{}
)(DiscountForm)

export default DiscountForm
