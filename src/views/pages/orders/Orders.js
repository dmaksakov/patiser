import React from "react"
import {Card, CardHeader, Col, Row,} from "reactstrap"
import {connect} from "react-redux"
import orderActions from "../../../redux/orders/actions"
import commonActions from "../../../redux/common/actions"
import customerActions from "../../../redux/customers/actions"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import Sidebar from "./OrderSidebar"
import SidebarOverlay from "../../components/SidebarOverlay";
import Pagination from "../../components/Pagination"
import SearchBar from "../../components/SearchBar";
import SingleOrder from "../../components/order/SingleOrder";
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import {getTourState, setTourState} from "../../../helpers/utility";
import {IFrameAd} from "../IFrameAd";

const {
	getOrders,
	getOrderDetails,
	deleteOrder,
	selectOrder,
	getOrdersDebounce,
	setPageParams,
	setSidebar,
	setTour,
} = orderActions

const {
	getMeasureSystemRequest,
	getDiscountTypesRequest,
	getOrderStatusesRequest,
} = commonActions

const {
	getAllCustomersRequest
} = customerActions


const ShowOrders = props => {
	const {orders, handleSidebar} = props

	return (
		<Card className="table-header">
			<CardHeader>
				<div className={'container-fluid grid-header p-1 d-none d-md-block table-header-rounded'}>
					<Row>
						<Col md={2}>
							Order #
						</Col>
						<Col md={2}>
							Customer name
						</Col>
						<Col md={2}>
							Status
						</Col>
						<Col md={2}>
							Total
						</Col>
						<Col md={2}>
							Scheduled at
						</Col>
						<Col md={2}>
							Actions
						</Col>
					</Row>
				</div>
				<div className={'container-fluid'}>
					{orders.map(order => (
						<SingleOrder
							{...props}
							order={order}
							key={order.sid}
							handleSidebar={handleSidebar}
						/>
					))}
				</div>
			</CardHeader>
		</Card>
	)
}

class Orders extends React.Component {

	state = {
		basicPicker: new Date(),
		sidebar: false,
		action: 'add',
		tourStatus: getTourState(),
	}

	componentDidMount() {
		this.props.getOrders({})
		this.props.getAllCustomersRequest()
		this.props.getDiscountTypesRequest()
		this.props.getOrderStatusesRequest()

		this.props.setTour(
			{
				run: true,
			});
	}

	handleSidebar = (boolean, action = 'add') => {
		if (action === 'add') {
			this.props.selectOrder({})
		}
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean)
	}

	changePage = (page) => {
		this.props.setPageParams({page})
		this.props.getOrdersDebounce({
			page,
			pageSize: this.props.pageSize
		})
	}

	handleJoyrideCallback = (data) => {
		const { sidebar, setSidebar, setTour } = this.props;
		const { action, index, type, status } = data;

		if (([STATUS.FINISHED, STATUS.SKIPPED]).includes(status)) {
			setTour({ run: false, stepIndex: 0 });
			setTourState({orders: 1})
			this.setState({tourStatus: getTourState()})

		} else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND]).includes(type)) {
			const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

			if (index === 0) {
				setTimeout(() => {
					setTour({run: true});
				}, 400);
			}
			else if (index === 1) {
				setSidebar(false)
				setTimeout(() => {
					setTour({stepIndex});
				}, 400);
			} else {
				setTour({
					stepIndex,
				});
			}
		}
	};

	render() {

		const {pageParams, setPageParams, getOrdersDebounce, sidebar, orders, ads} = this.props
		const {page, pageSize, total} = pageParams
		const { run, steps, steps2, stepIndex } = this.props.tour;
		const {tourStatus} = this.state
		const iframe = '<iframe id="iframe" />'

		return (
			<React.Fragment>

				{/*TODO: get rid of 2 tours make it one*/}

				{(!tourStatus.hasOwnProperty('orders') || tourStatus.orders !== 1) &&
				<Joyride
					continuous={true}
					run={run}
					steps={steps}
					stepIndex={stepIndex}
					scrollToFirstStep={true}
					showProgress={true}
					showSkipButton={true}
					hideBackButton={true}
					callback={this.handleJoyrideCallback}
				/>}

				{tourStatus.orders === 1 && (!tourStatus.hasOwnProperty('orders2') || tourStatus.orders2 !== 1) && orders.length === 1 &&
				<Joyride
					continuous={true}
					run={run}
					steps={steps2}
					stepIndex={stepIndex}
					scrollToFirstStep={true}
					callback={this.handleJoyrideCallback}
				/>}

				<Breadcrumbs
					breadCrumbTitle="Orders"
					breadCrumbActive="Orders"
				/>
				<Row>
					<Col sm="12">

						<SearchBar
							{...this.props}
							sortOptions={[
								{
									label: 'Newest First',
									value: 'desc'
								},
								{
									label: 'Oldest First',
									value: 'asc'
								}
							]}
							defaultValue={{
								label: 'Newest First',
								value: 'desc'
							}}
							getResultsDebounce={getOrdersDebounce}
							handleSidebar={this.handleSidebar}
							pageParams={pageParams}
							setPageParams={setPageParams}
						/>

						<ShowOrders
							{...this.props}
							handleSidebar={this.handleSidebar}
						/>

						<Pagination
							changePage={this.changePage}
							currentPage={page}
							pageSize={pageSize}
							total={total}
						/>

						<div className={`data-list list-view`}>
							<Sidebar
								{...this.props}
								show={sidebar}
								handleSidebar={this.handleSidebar}
								action={this.state.action}
							/>
							<SidebarOverlay
								sidebar={sidebar}
								handleSidebar={this.handleSidebar}
							/>
						</div>
					</Col>
				</Row>

				<Row>
					<Col xs={12}>
						<IFrameAd
							iframe={iframe}
							adCode={ads.highTier}
						/>
					</Col>
				</Row>

			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	const {
		loading,
		orders,
		pageParams,
		sidebar,
		tour,
	} = state.orders.toJS()
	const {
		measureSystems,
		discountTypes,
		orderStatuses,
		isMobile,
		ads,
	} = state.common.toJS()
	const {
		allCustomers,
	} = state.customers.toJS()
	return {
		loading,
		orders,
		allCustomers,
		measureSystems,
		discountTypes,
		orderStatuses,
		pageParams,
		sidebar,
		isMobile,
		tour,
		ads,
	}
}

export default connect(mapStateToProps, {
	getOrders,
	getOrderDetails,
	deleteOrder,
	selectOrder,
	getMeasureSystemRequest,
	getAllCustomersRequest,
	getDiscountTypesRequest,
	getOrderStatusesRequest,
	getOrdersDebounce,
	setPageParams,
	setSidebar,
	setTour,
})(Orders)
