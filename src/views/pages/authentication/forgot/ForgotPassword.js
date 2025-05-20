import React from "react"
import {
	Card,
	CardHeader,
	CardTitle,
	CardBody,
	Row,
	Col,
	FormGroup,
	Form,
	Input,
	Button,
	Label
} from "reactstrap"
import fgImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"
import accountActions from "../../../../redux/account/actions"
import {connect} from "react-redux"

const {
	forgotPasswordRequest
} = accountActions

class ForgotPassword extends React.Component {

	state = {
		username: '',
	}

	handleForgotPassword = () => {
		this.props.forgotPasswordRequest(this.state.username, this.props.history)
	}

	render() {
		return (
			<Row className="m-0 justify-content-center">
				<Col
					sm="8"
					xl="7"
					lg="10"
					md="8"
					className="d-flex justify-content-center"
				>
					<Card className="bg-authentication rounded-0 mb-0 w-100">
						<Row className="m-0">
							<Col
								lg="6"
								className="d-lg-block d-none text-center align-self-center"
							>
								<img className="width-inherit" src={fgImg} alt="fgImg"/>
							</Col>
							<Col lg="6" md="12" className="p-0">
								<Card className="rounded-0 mb-0 px-2 py-1">
									<CardHeader className="pb-1">
										<CardTitle>
											<h4 className="mb-0">Recover your password</h4>
										</CardTitle>
									</CardHeader>
									<p className="px-2 auth-title">
										Please enter your email address and we'll send you
										instructions on how to reset your password.
									</p>
									<CardBody className="pt-1 pb-0">
										<Form>
											<FormGroup className="form-label-group">
												<Input
													type="text"
													placeholder="Email"
													value={this.state.username}
													onChange={e => this.setState({username: e.target.value})}
													required
												/>
												<Label>Email</Label>
											</FormGroup>
											<div className="float-md-left d-block mb-1">
												<Button.Ripple
													color="primary"
													outline
													className="px-75 btn-block"
													onClick={() => this.props.history.push("/login")}
												>
													Back to Login
												</Button.Ripple>
											</div>
											<div className="float-md-right d-block mb-1">
												<Button.Ripple
													color="primary"
													type="submit"
													className="px-75 btn-block"
													onClick={e => {
														e.preventDefault()
														this.handleForgotPassword()
													}}
												>
													Recover Password
												</Button.Ripple>
											</div>
										</Form>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		)
	}
}

const mapStateToProps = (state) => {
	const {
		signupSuccess
	} = state.account.toJS()

	return {
		signupSuccess
	}
}

export default connect(mapStateToProps, {
	forgotPasswordRequest,
})(ForgotPassword)
