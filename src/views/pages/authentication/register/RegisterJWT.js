import React, {useState} from "react"
import { Field, reduxForm } from 'redux-form'
import {FormGroup, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"
import {connect} from "react-redux"
import accountActions from "../../../../redux/account/actions"
import renderTextField from "../../../form/elements/textField"
import renderCheckBox from "../../../form/elements/checkBox"
import {Terms} from "../terms"
import {
	required,
	email,
	terms,
} from '../../../../config/valiadationConfig'

const {
	signupRequest,
} = accountActions

let RegisterForm = props => {

	const { handleSubmit, submitting } = props
	let [modal, setModal] = useState(false)

	const toggleModal = () => {
		setModal(!modal)
	}
	const clickTerms = (e) => {
		toggleModal()
	}

	return (
		<>
			<Modal
				isOpen={modal}
				toggle={toggleModal}
				className="modal-dialog-centered modal-lg"
			>
				<ModalHeader className="bg-primary">
					Patiser Terms and Conditions
				</ModalHeader>
				<ModalBody>
					<Terms />
				</ModalBody>
				<ModalFooter>
					<Button onClick={toggleModal} color="primary">Ok</Button>
				</ModalFooter>
			</Modal>
			<form id="registerForm" onSubmit={handleSubmit}>
				<FormGroup>
					<Field
						name="email"
						component={renderTextField}
						type="text"
						label="Email"
						validate={[required, email]}
					/>
					<Field
						name="firstName"
						component={renderTextField}
						type="text"
						label="First Name"
						validate={required}
					/>
					<Field
						autoComplete="new-password"
						name="lastName"
						type="text"
						label="Last Name"
						component={renderTextField}
					/>
					<Field
						name="password"
						autoComplete="new-password"
						type="password"
						label="Password"
						component={renderTextField}
						validate={required}
					/>
					<Field
						name="confirmPass"
						type="password"
						label="Confirm Password"
						component={renderTextField}
						validate={required}
					/>
					<Field
						name="terms"
						className="checkbox-terms"
						label={<div><span>I accept the </span><a href='#' onClick={clickTerms}>terms & conditions</a></div>}
						component={renderCheckBox}
						validate={terms}
					/>
				</FormGroup>

				<div className="d-flex justify-content-between">
					<Button
						color="primary"
						outline
						onClick={() => {
							props.history.push("/login")
						}}
					>
						Login
					</Button>
					<Button
						form="registerForm"
						color="primary"
						type="submit"
						disabled={submitting}
					>
						Register
					</Button>
				</div>
			</form>
		</>
	)
}

RegisterForm = reduxForm({
	form: 'RegisterForm',
})(RegisterForm)

RegisterForm = connect(
	state => ({
		initialValues: {},
	}),
	{
		signupRequest,
	}
)(RegisterForm)

export default RegisterForm
