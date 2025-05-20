import React from "react"
import {
	Row,
	Col,
} from "reactstrap"
import "../../assets/scss/pages/users.scss"
import accountActions from "../../redux/account/actions"
import companyActions from "../../redux/company/actions"
import {connect} from "react-redux"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import ProfileAccount from "./account/profile/ProfileAccount"
import ProfileCompany from "./account/profile/ProfileCompany"

const {
	getProfileRequest,
} = accountActions

const {
	getCompanyRequest,
} = companyActions

class UserView extends React.Component {

	componentDidMount() {
		this.props.getProfileRequest()
		this.props.getCompanyRequest()
	}

	render() {

		const {
			profile,
			company,
		} = this.props

		return (
			<React.Fragment>
				{profile.company && company.name &&
				<Row>
					<Col xs="12">
						<Breadcrumbs
							breadCrumbTitle="Account"
							breadCrumbActive="Profile"
						/>
						<ProfileAccount
							{...this.props}
						/>
					</Col>
					<Col xs="12">
						<ProfileCompany
							{...this.props}
						/>
					</Col>
				</Row>
				}
			</React.Fragment>
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
		company: state.company.toJS().company,
	}
}

export default connect(mapStateToProps, {
	getProfileRequest,
	getCompanyRequest,
})(UserView)
