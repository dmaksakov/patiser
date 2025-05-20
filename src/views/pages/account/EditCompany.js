import React from "react"
import {
	Row,
	Col,
} from "reactstrap"
import Company from "./Company"
import "../../../assets/scss/pages/users.scss"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"

class CompanyEdit extends React.Component {

	render() {
		return (
			<Row>
				<Col sm="12">
					<Breadcrumbs
						breadCrumbTitle="Edit company"
						breadCrumbParent="Account"
						parentLink="/account/profile"
						breadCrumbActive="Edit Company"
					/>
					<Company {...this.props} />
				</Col>
			</Row>
		)
	}
}

export default CompanyEdit
