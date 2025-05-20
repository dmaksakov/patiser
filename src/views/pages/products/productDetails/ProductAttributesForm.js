import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	FormGroup, Button, Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../../form/elements/textField"
import renderTagsInputField from "../../../form/elements/optionsField"

class ProductAttributesForm extends React.Component {

	render() {

		const { handleSubmit, selectedProduct, action, loading, handleSidebar } = this.props

		return (
			<Row>
				<Col sm={12}>
					<form id='productAttributesForm' onSubmit={handleSubmit}>
						<Row>
							<Col sm={12}>
								<FormGroup>
									<Field
										name="name"
										component={renderTextField}
										type="text"
										label="Name"
									/>
									{selectedProduct.is_variable && action === 'add' &&
										<Field
											name="values"
											component={renderTagsInputField}
											type="text"
											label="Values"
										/>
									}
									{!selectedProduct.is_variable &&
										<Field
											name="value"
											component={renderTextField}
											type="text"
											label="Value"
										/>
									}
								</FormGroup>
							</Col>
							<Col xs={12}>
								<hr className={'my-2'}/>
								<Button disabled={loading} form="productAttributesForm" type="submit" color="primary">
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
	}

};

ProductAttributesForm = reduxForm({
	form: 'ProductAttributesForm',
	enableReinitialize: true
})(ProductAttributesForm)

ProductAttributesForm = connect(
	state => ({
		initialValues: state.products.toJS().selectedAttribute,
	}),
	{}
)(ProductAttributesForm)

export default ProductAttributesForm
