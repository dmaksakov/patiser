import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	FormGroup, Button,
} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../../form/elements/textField"
import renderSelectField from "../../../form/elements/selectField"
import renderCheckBox from "../../../form/elements/checkBox"

let ProductDetailsForm = props => {

	const { handleSubmit, productCategories, loading, action, handleSidebar } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='productForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								<Field
									name="category"
									component={renderSelectField}
									label="Product category"
									options={productCategories.map(category => ({
										value: category.sid,
										label: category.name
									}))}
								/>
								<Field
									name="name"
									component={renderTextField}
									type="text"
									label="Name"
								/>
								<Field
									name="recipe_based"
									component={renderCheckBox}
									type="checkbox"
									label="Recipe based"
								/>
								<Field
									name="price"
									component={renderTextField}
									type="number"
									label="Price"
								/>
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button form="productForm" type="submit" color="primary">
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

ProductDetailsForm = reduxForm({
	form: 'ProductForm',
	enableReinitialize: true
})(ProductDetailsForm)

ProductDetailsForm = connect(
	state => ({
		initialValues: state.products.toJS().selectedProduct
	}),
	{}
)(ProductDetailsForm)

export default ProductDetailsForm
