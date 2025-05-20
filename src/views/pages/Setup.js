import React from "react"
import accountActions from "../../redux/account/actions"
import commonActions from "../../redux/common/actions"
import companyActions from "../../redux/company/actions"
import {connect} from "react-redux"
import IncompleteForm from "./dashboard/IncompleteForm"

const {
	getProfileRequest,
} = accountActions

const {
	getCurrenciesRequest,
	getMeasureSystemRequest,
} = commonActions

const {
	updateCompanyRequest,
	getCompanyRequest,
} = companyActions

class Setup extends React.Component {

	componentDidMount() {
		this.props.getProfileRequest()
		this.props.getCurrenciesRequest()
		this.props.getCompanyRequest()
		this.props.getMeasureSystemRequest()

	}

	saveForm = (values) => {
		const props = {
			...this.props.company,
			...values,
			currency: values.currency.value,
			measure_system: values.measure_system.value,
			hour_rate: parseFloat(this.props.company.hour_rate),
			address: values.address ? {
				address: values.address,
				city: values.city,
				state_province: values.state_province,
				zip_code: values.zip_code,
				country_code: values.country.value
			} : null
		}
		this.props.updateCompanyRequest(props, true)
	}

	render() {

		return (
			<React.Fragment>
				<IncompleteForm
					{...this.props}
					onSubmit={this.saveForm}
				/>
			</React.Fragment>
		)
	}
}

export default connect(
	state => ({
		profile: state.account.toJS().profile,
		currencies: state.common.toJS().currencies,
		measureSystems: state.common.toJS().measureSystems,
		company: state.company.toJS().company
	}),
	{
		getProfileRequest,
		getCurrenciesRequest,
		updateCompanyRequest,
		getCompanyRequest,
		getMeasureSystemRequest,
	}
)(Setup)
