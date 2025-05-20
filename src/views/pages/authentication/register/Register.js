import React from "react"
import {
	Card,
	CardHeader,
	CardTitle,
	CardBody,
	Row,
	Col,
} from "reactstrap"
import registerImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"
import RegisterForm from "./RegisterJWT"
import {connect} from "react-redux";
import accountActions from "../../../../redux/account/actions";

const {
	signupRequest,
} = accountActions

class Register extends React.Component {

	state = {
		activeTab: "1"
	}
	toggle = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			})
		}
	}

	signup = values => {
		this.props.signupRequest({
			...values,
			history: this.props.history
		})
	}

	render() {
		return (
			<React.Fragment>

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
									className="d-lg-block d-none text-center align-self-center px-1 py-0"
								>
									<img className="mr-1 width-inherit" src={registerImg} alt="registerImg"/>
								</Col>
								<Col lg="6" md="12" className="p-0">
									<Card className="rounded-0 mb-0 p-2">
										<CardHeader className="pb-1 pt-50">
											<CardTitle>
												<h4 className="mb-0">Create Account</h4>
											</CardTitle>
										</CardHeader>
										<p className="px-2 auth-title mb-0">
											Fill the below form to create a new account.
										</p>
										<CardBody className="pt-1 pb-50">
											<RegisterForm
												history={this.props.history}
												onSubmit={this.signup}
											/>
										</CardBody>
									</Card>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</React.Fragment>

		)
	}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps, {
	signupRequest,
})(Register)
