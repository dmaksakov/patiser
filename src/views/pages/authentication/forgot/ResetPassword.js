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
import {history} from "../../../../redux/store"
import resetImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"
import accountActions from "../../../../redux/account/actions"
import {connect} from "react-redux"

const {
	resetPasswordRequest
} = accountActions

class ResetPassword extends React.Component {

	state = {
		username: '',
		password: '',
		confirm_password: '',
	}

	handleResetPassword = () => {
		const params = new URLSearchParams(this.props.location.search)
		const token = params.get('token')

		this.props.resetPasswordRequest({
			token: token,
			username: this.state.username,
			password: this.state.password,
			confirm_password: this.state.confirm_password,
			history:this.props.history
		})
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
								className="d-lg-block d-none text-center align-self-center px-5"
							>
								<img className="px-5 mx-2 width-inherit" src={resetImg} alt="resetImg"/>
							</Col>
							<Col lg="6" md="12" className="p-0">
								<Card className="rounded-0 mb-0 px-2 py-50">
									<CardHeader className="pb-1 pt-1">
										<CardTitle>
											<h4 className="mb-0">Reset Password</h4>
										</CardTitle>
									</CardHeader>
									<p className="px-2 auth-title">
										Please enter your email address and new password to
										continue.
									</p>
									<CardBody className="pt-1">
										<Form>
											<FormGroup className="form-label-group">
												<Input
													type="email"
													placeholder="Email"
													value={this.state.username}
													onChange={e => this.setState({username: e.target.value})}
													required
												/>
												<Label>Email</Label>
											</FormGroup>
											<FormGroup className="form-label-group">
												<Input
													type="password"
													placeholder="Password"
													value={this.state.password}
													onChange={e => this.setState({password: e.target.value})}
													required
												/>
												<Label>Password</Label>
											</FormGroup>
											<FormGroup className="form-label-group">
												<Input
													type="password"
													placeholder="Confirm Password"
													value={this.state.confirm_password}
													onChange={e => this.setState({confirm_password: e.target.value})}
													required
												/>
												<Label>Confirm Password</Label>
											</FormGroup>
											<div
												className="d-flex justify-content-between flex-wrap flex-sm-row flex-column">
												<Button.Ripple
													block
													className="btn-block"
													color="primary"
													outline
													onClick={e => {
														e.preventDefault()
														history.push("/login")
													}}
												>
													Go Back to Login
												</Button.Ripple>
												<Button.Ripple
													block
													color="primary"
													type="submit"
													className="btn-block mt-1 mt-sm-0"
													onClick={e => {
														e.preventDefault()
														this.handleResetPassword()
													}}
												>
													Reset
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
		loading
	} = state.account.toJS()

	return {
		loading
	}
}

export default connect(mapStateToProps, {
	resetPasswordRequest,
})(ResetPassword)
