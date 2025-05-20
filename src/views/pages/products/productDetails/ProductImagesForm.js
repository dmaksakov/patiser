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

let ProductImagesForm = props => {

	const { handleSubmit, loading, handleSidebar, variationLoading, variation } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='productImagesForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								<Field
									name="name"
									component={renderTextField}
									type="text"
									label="Image name"
								/>
								<Field
									name="description"
									component={renderTextField}
									type="text"
									label="Description"
								/>
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button disabled={variation ? variationLoading : loading} form="productImagesForm" type="submit" color="primary">
								{(variation ? variationLoading : loading) && <Spinner color="white" size="sm" />}
								<span className="ml-50">Update</span>
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

ProductImagesForm = reduxForm({
	form: 'ProductImagesForm',
	enableReinitialize: true
})(ProductImagesForm)

ProductImagesForm = connect(
	state => ({
		initialValues: state.products.toJS().selectedProductImage,
		variationLoading: state.variation.toJS().loading,
	}),
	{}
)(ProductImagesForm)

export default ProductImagesForm
