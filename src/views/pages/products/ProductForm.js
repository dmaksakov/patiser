import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	FormGroup,
	Button,
	Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../form/elements/textField"
import renderSelectField from "../../form/elements/selectField"
import renderRadioField from "../../form/elements/radioField"


let ProductForm = props => {

	const { handleSubmit, productCategories, action, taxCategories, loading, handleSidebar } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='productForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>

								{action === 'add' &&
								<div className="product-type">
									<label>Product type</label>
									<div className="mb-1">
										<label>
											<Field
												name="type"
												component={renderRadioField}
												options={[
													{
														label: 'Simple',
														value: 'simple'
													},
													{
														label: 'Variable',
														value: 'variable'
													}
												]}
											/>
											Recipe based
										</label>
									</div>
								</div>}

								<label>Recipe based/fixed price</label>
								<div className="mb-1 recipe-based">
									<label>
										<Field
											name="recipe_based"
											component={renderRadioField}
											options={[
												{
													label: 'Recipe based',
													value: 'yes'
												},
												{
													label: 'Fixed price',
													value: 'no'
												}
											]}
										/>
									</label>
								</div>

								<Field
									className="product-name"
									name="name"
									component={renderTextField}
									type="text"
									label="Name"
								/>

								<div className="product-category">
								<Field
									name="category"
									component={renderSelectField}
									isSearchable={false}
									label="Product category"
									options={productCategories && productCategories.map(category => ({
										value: category.sid,
										label: category.name
									}))}
								/>
								</div>

								<div className="tax-category">
								<Field
									name="tax_category"
									component={renderSelectField}
									isSearchable={false}
									label="Tax category"
									options={taxCategories && taxCategories.map(category => ({
										value: category.sid,
										label: category.name
									}))}
								/>
								</div>

								{	props.forms
									&& props.forms.ProductForm
									&& props.forms.ProductForm.values
									&& props.forms.ProductForm.values.recipe_based === "no"
									&& !props.selectedProduct.is_variable && <Field
									name="price"
									component={renderTextField}
									type="number"
									step="0.01"
									label="Price"
								/>
								}

							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button disabled={loading} form="productForm" type="submit" color="primary">
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

ProductForm = reduxForm({
	form: 'ProductForm',
	enableReinitialize: true
})(ProductForm)

ProductForm = connect(
	state => ({
		initialValues: state.products.toJS().selectedProduct,
		forms: state.form,
	}),
	{}
)(ProductForm)

export default ProductForm
