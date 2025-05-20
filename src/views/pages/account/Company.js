import React from "react"
import CompanyForm from "./CompanyForm"
import {Card, CardBody} from "reactstrap"
import companyActions from "../../../redux/company/actions"
import commonActions from "../../../redux/common/actions"
import {connect} from "react-redux"

const {
	updateCompanyRequest,
	getCompanyRequest,
} = companyActions

const {
	getCurrenciesRequest,
	getCountriesRequest,
} = commonActions

class CompanyAccount extends React.Component {

	componentDidMount() {
		this.props.getCompanyRequest()
		this.props.getCurrenciesRequest()
		this.props.getCountriesRequest()
	}

	saveCompany = (values) => {

		let params = {
			name: values.name ? values.name : '',
			legal_name: values.legal_name ? values.legal_name : '',
			offers_pickup: values.offers_pickup,
			offers_delivery: values.offers_delivery,
			email: values.email ? values.email : '',
			phone: values.phone ? values.phone : '',
			hour_rate: values.hour_rate ? parseFloat(values.hour_rate) : 0,
			currency: values.currency ? values.currency.value : '',
			measure_system:"METRIC",
			form: 'CompanyForm'
		}

		if (values.address || values.city || values.state_province || values.zip_code || values.country) {
			params = {
				...params,
				address: {
					address: values.address,
					city: values.city,
					state_province: values.state_province,
					zip_code: values.zip_code,
					country_code: values.country_code.value
				}
			}
		}

		this.props.updateCompanyRequest(params)
	}

	render() {

		return (
			<React.Fragment>
				<Card>
					<CardBody className="pt-2">
						<CompanyForm
							{...this.props}
							onSubmit={this.saveCompany}
						/>
					</CardBody>
				</Card>
			</React.Fragment>
		)
	}
}

export default connect(
	state => ({
		loading: state.company.toJS().loading,
		company: state.company.toJS().company,
		currencies: state.common.toJS().currencies,
		countries: state.common.toJS().countries,
	})
	,{
		updateCompanyRequest,
		getCompanyRequest,
		getCurrenciesRequest,
		getCountriesRequest,
})(CompanyAccount)
