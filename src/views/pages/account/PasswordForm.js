import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	Button,
	Input,
	Label,
	FormGroup,
} from "reactstrap"

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
	<div>
		<Label>{label}</Label>
		<Input
			{...input}
			type={type}
			placeholder={label}
		/>
		{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
	</div>
)

const PasswordForm = props => {
	const { handleSubmit, pristine, reset, submitting, profile } = props;

	return profile.company ? (
		<Row>
			<Col sm={12}>
				<Row>
					<Col sm={6}>

					</Col>
					<Col sm={6}>
						<form onSubmit={handleSubmit}>
							<Row>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="password"
												component={renderField}
												type="password"
												label="Password"
											/>
										</div>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="confirm_password"
												component={renderField}
												type="password"
												label="Confirm Password"
											/>
										</div>
									</FormGroup>
								</Col>
								<Col className="d-flex justify-content-end flex-wrap mt-2" sm="12">
									<Button.Ripple
										className="mr-1"
										color="success"
										type="submit"
										disabled={pristine || submitting}
									>
										Change Password
									</Button.Ripple>
								</Col>
							</Row>

						</form>
					</Col>
				</Row>
			</Col>
		</Row>
	) : ''
};

export default reduxForm({
	form: 'passwordForm', // a unique identifier for this form
})(PasswordForm);
