import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	Button,
	FormGroup,
	Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderSelectField from "../../../form/elements/selectField"
import renderTextField from "../../../form/elements/textField";

let ProductVariationsForm = props => {

	const { handleSubmit, selectedProduct, action, variationLoading, handleSidebar } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='productVariationsForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								{action === 'add' && selectedProduct.is_variable && selectedProduct && selectedProduct.attributes && selectedProduct.attributes.map(attribute =>
									<Field
										key={attribute.sid}
										name={attribute.sid}
										component={renderSelectField}
										isSearchable={false}
										label={attribute.name}
										options={attribute.values.map(attributeValue => ({
											value: attributeValue.name,
											label: attributeValue.name
										}))}
									/>
								)}
								{action === 'edit' &&
									<>
										<Field
											name="name"
											component={renderTextField}
											label="Variation name"
											type="text"
										/>
									</>
								}
								{selectedProduct.recipe_based === 'no' && <Field
									name="price"
									component={renderTextField}
									label="Variation price"
									type="number"
									step="0.01"
								/>}
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className="my-2"/>
							<Button
								disabled={variationLoading}
								// disabled={loading && selectedProduct.attributes && selectedProduct.attributes.length === 0}
								form="productVariationsForm"
								type="submit"
								color="primary"
							>
								{variationLoading && <Spinner color="white" size="sm" />}
								<span className="ml-50">{action === 'add' ? 'Add' : 'Update'}</span>
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

ProductVariationsForm = reduxForm({
	form: 'ProductVariationsForm',
	enableReinitialize: true
})(ProductVariationsForm)

ProductVariationsForm = connect(
	state => ({
		initialValues: state.variation.toJS().selectedVariation,
		variationLoading: state.variation.toJS().loading,
	}),
	{}
)(ProductVariationsForm)

export default ProductVariationsForm
