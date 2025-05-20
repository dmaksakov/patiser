import React from "react"
import accountActions from "../../redux/account/actions"
import commonActions from "../../redux/common/actions"
import companyActions from "../../redux/company/actions"
import dashboardActions from "../../redux/dashboard/actions";
import {connect} from "react-redux"
import Dashboard from "./dashboard/Dashboard"
import Joyride, { STATUS } from 'react-joyride';
import {getTourState, setTourState} from "../../helpers/utility";

const {
	getProfileRequest,
} = accountActions

const {
	getCurrenciesRequest,
} = commonActions

const {
	updateCompanyRequest,
	getCompanyRequest,
	getCompanyMeasureUnits,
} = companyActions

const {
	getInsightsRequest,
	getUpcomingRequest,
} = dashboardActions

class Home extends React.Component {

	state = {
		tourStatus: getTourState(),
		steps: [
			{
				target: 'body',
				placement: 'center',
				content: <>
							<h5>Welcome to Patiser!</h5>
							<p>For starters, you have to add all the ingredients that are used in recipes.</p>
							<p>To add an ingredient please choose the Ingredients page from the menu.</p>
						</>,
				disableBeacon: true
			},
			{
				target: '.user-profile',
				content: 'Click here to access company and user profile settings',
				spotlightPadding: 0,
			},
			{
				target: '.recipe-insight',
				content: 'Number of recipes added last 30 days',
				spotlightPadding: 0,
			},
			{
				target: '.product-insight',
				content: 'Number of products added last 30 days',
				spotlightPadding: 0,
			},
			{
				target: '.order-insight',
				content: 'Number of orders received last 30 days',
				spotlightPadding: 0,
			},
			{
				target: '.sales-insight',
				content: 'Money earned last 30 days',
				spotlightPadding: 0,
			},
			{
				target: this.props.isMobile ? '.menu-mobile' : '.menu-ingredients',
				content: 'Click here to start adding the ingredients',
				placement: 'right',
				hideCloseButton: true,
				hideFooter: true,
				spotlightPadding: 0,
			},
		]
	};

	componentDidMount() {
		this.props.getCurrenciesRequest()
		this.props.getCompanyRequest()
		this.props.getCompanyMeasureUnits()
		this.props.getInsightsRequest()
		this.props.getUpcomingRequest({})
	}

	handleJoyrideCallback = data => {
		const { status } = data;

		if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
			setTourState({dashboard: 1})
		}
	};

	render() {
		const { dashboardInsights, dashboardUpcoming } = this.props
		const { steps, tourStatus } = this.state;

		return (
			<React.Fragment>
				{(!tourStatus.hasOwnProperty('dashboard') || tourStatus.dashboard !== 1) &&
				<Joyride
					callback={this.handleJoyrideCallback}
					steps={steps}
					continuous={true}
				/>}
				<Dashboard
					{...this.props}
					insights={dashboardInsights}
					upcoming={dashboardUpcoming}
				/>
			</React.Fragment>
		)
	}
}

export default connect(
	state => ({
		loaded: state.dashboardUpcoming.toJS().loaded,
		profile: state.account.toJS().profile,
		currencies: state.common.toJS().currencies,
		measureSystems: state.common.toJS().measureSystems,
		company: state.company.toJS().company,
		isMobile: state.common.toJS().isMobile,
		companyMeasureUnits: state.company.toJS().companyMeasureUnits,
		dashboardInsights: state.dashboardInsights.toJS().items,
		dashboardUpcoming: state.dashboardUpcoming.toJS(),
		ads: state.common.toJS().ads,
	}),
	{
		getProfileRequest,
		getCurrenciesRequest,
		updateCompanyRequest,
		getCompanyRequest,
		getCompanyMeasureUnits,
		getInsightsRequest,
		getUpcomingRequest,
	}
)(Home)
