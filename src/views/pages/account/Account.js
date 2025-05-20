import React from "react"
import ProfileForm from "./ProfileForm"
import {Card, CardBody, Col} from "reactstrap"
import PasswordForm from "./PasswordForm"
import accountActions from "../../../redux/account/actions"
import {connect} from "react-redux";

const {
	updateProfileRequest,
} = accountActions

class UserAccount extends React.Component {

	saveProfile = (values) => {
		this.props.updateProfileRequest(values)
	}

	changePassword = (values) => {
		this.props.updateProfileRequest({
			first_name: this.props.profile.first_name,
			last_name: this.props.profile.last_name,
			...values
		})
	}

	render() {

		return (
			<React.Fragment>
				<Card>
					<CardBody className="pt-2">
						<ProfileForm
							{...this.props}
							onSubmit={this.saveProfile}
						/>
					</CardBody>
				</Card>
				<Card>
					<CardBody className="pt-2">
						<PasswordForm
							{...this.props}
							onSubmit={this.changePassword}
						/>
					</CardBody>
				</Card>
			</React.Fragment>
		)
	}
}

export default connect(
	state => ({
		profile: state.account.toJS().profile,
		loading: state.account.toJS().loading
	})
	,{
		updateProfileRequest,
})(UserAccount)
