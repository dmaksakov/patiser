import React from "react"
import {Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row} from "reactstrap"
import {Check, Lock, Mail} from "react-feather"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import authAction from "../../../../redux/auth/actions"
import {connect} from "react-redux"
import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"

const {login} = authAction

class Login extends React.Component {

	state = {
		activeTab: "1",
		email: "",
		password: ""
	}

	toggle = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			})
		}
	}

	handleLogin = () => {
		const { history } = this.props;
		const {login} = this.props;
		login(this.state.email, this.state.password,history);
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

					<Card className="bg-authentication login-card rounded-0 mb-0 w-100">
						<Row className="m-0">
							<Col
								lg="6"
								className="d-lg-block d-none text-center align-self-center px-1 py-0"
							>
								<img className="width-inherit" src={loginImg} alt="loginImg"/>
							</Col>
							<Col lg="6" md="12" className="p-0">
								<Card className="rounded-0 mb-0 px-2">
									<CardBody>
										<h4>Login</h4>
										<p>Welcome back, please login to your account.</p>
										<Form onSubmit={e => e.preventDefault()}>
											<FormGroup className="form-label-group position-relative has-icon-left">
												<Input
													type="email"
													placeholder="Email"
													value={this.state.email}
													onChange={e => this.setState({email: e.target.value})}
												/>
												<div className="form-control-position">
													<Mail size={15}/>
												</div>
												<Label>Email</Label>
											</FormGroup>
											<FormGroup className="form-label-group position-relative has-icon-left">
												<Input
													type="password"
													placeholder="Password"
													value={this.state.password}
													onChange={e => this.setState({password: e.target.value})}
												/>
												<div className="form-control-position">
													<Lock size={15}/>
												</div>
												<Label>Password</Label>
											</FormGroup>
											<FormGroup className="d-flex justify-content-between align-items-center">
												<Checkbox
													color="primary"
													icon={<Check className="vx-icon" size={16}/>}
													label="Remember me"
												/>
												<div className="float-right">
													<Button.Ripple
														color="flat-primary"
														onClick={() => this.props.history.push('/forgot-password')}
													>
														Forgot Password?
													</Button.Ripple>
												</div>
											</FormGroup>
											<div className="d-flex justify-content-between">
												<Button.Ripple
													color="primary"
													outline
													onClick={() => this.props.history.push('/register')}
												>
													Register
												</Button.Ripple>
												<Button.Ripple
													color="primary"
													type="submit"
													onClick={this.handleLogin}
												>
													Login
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

function mapStateToProps(state) {
	const {
		isLoggedIn,
	} = state.auth.toJS();

	return {
		isLoggedIn,
	}
}

export default connect(mapStateToProps, {
	login,
})(Login)
