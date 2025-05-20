import React from "react"
import {
	Row,
	Col,
} from "reactstrap"
import Account from "./Account"
import "../../../assets/scss/pages/users.scss"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import accountActions from "../../../redux/account/actions"
import {connect} from "react-redux"
import errorActions from "../../../redux/errors/actions"

const {
	getProfileRequest,
} = accountActions

class UserEdit extends React.Component {

	componentDidMount() {
		this.props.getProfileRequest()
	}

	render() {
		return (
			<Row>
				<Col sm="12">
					<Breadcrumbs
						breadCrumbTitle="Edit account"
						breadCrumbParent="Account"
						parentLink="/account/profile"
						breadCrumbActive="Edit"
					/>
					<Account {...this.props} />
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
})(UserEdit)
