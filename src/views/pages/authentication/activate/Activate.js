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
import authActons from "../../../../redux/auth/actions";
import {connect} from "react-redux";
import accountActions from "../../../../redux/account/actions";
import qs from 'qs'

const {
	verifyTokenRequest,
} = authActons

const {
	getProfileRequest,
} = accountActions

class Activate extends React.Component {

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

	componentDidMount() {
		const token = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).token
		this.props.verifyTokenRequest(token, this.props.history)
	}

	render() {

		const {
			profile,
		} = this.props

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
								className="d-lg-block d-none text-center align-self-center px-1 py-0"
							>
								<img className="mr-1 width-inherit" src={registerImg} alt="registerImg"/>
							</Col>
							<Col lg="6" md="12" className="p-0">
								<Card className="rounded-0 mb-0 p-2 pt-100">
									<CardHeader className="pb-1 pt-50">
										<CardTitle>
											<h4 className="mb-0">Account activation</h4>
										</CardTitle>
									</CardHeader>
									<CardBody className="pt-1 pb-50">
										{profile.active
											?
											<p>You have successfully activated your account!</p>
											:
											<p>Profile activation is in progress. Please wait ...</p>
										}
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

const mapStateToProps = state => {
	const {
		loading,
		profile,
	} = state.account.toJS()
	return {
		loading,
		profile,
	}
}

export default connect(mapStateToProps, {
	getProfileRequest,
	verifyTokenRequest,
})(Activate)
