import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	Button,
	FormGroup, Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../../form/elements/textField"

let ProductCategoryForm = props => {

	const { handleSubmit, loading, action, handleSidebar } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='productCategoryForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								<Field
									name="name"
									component={renderTextField}
									type="text"
									label="Name"
								/>
							</FormGroup>
						</Col>

						<Col xs={12}>
							<hr className="my-2"/>
							<Button  disabled={loading} form="productCategoryForm" type="submit" color="primary">
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

ProductCategoryForm = reduxForm({
	form: 'ProductCategoryForm',
	enableReinitialize: true
})(ProductCategoryForm)

ProductCategoryForm = connect(
	state => ({
		initialValues: state.categories.toJS().selectedProductCategory
	}),
	{}
)(ProductCategoryForm)

export default ProductCategoryForm
