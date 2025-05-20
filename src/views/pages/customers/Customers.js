import React from "react"
import {
	Button,
	Card,
	CardHeader,
	Row,
	Col,
	Popover,
	PopoverHeader,
	PopoverBody,
} from "reactstrap"
import {
	Edit,
	Trash,
} from "react-feather"
import {connect} from "react-redux"
import customerActions from "../../../redux/customers/actions"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import Sidebar from "./CustomerSidebar"
import SidebarOverlay from "../../components/SidebarOverlay";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import {IFrameAd} from "../IFrameAd";

const {
	getCustomersRequest,
	deleteCustomerRequest,
	selectCustomer,
	getCustomersDebounce,
	setPageParams,
	setSidebar,
} = customerActions

class SingleCustomer extends React.Component {

	state = {
		popoverOpen: false,
	}

	togglePopover = () => {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		})
	}

	render() {
		const {data, handleSidebar, selectCustomer, deleteCustomerRequest, isMobile} = this.props

		const showActions =
			<>
				<Edit
					className="cursor-pointer mr-1"
					size={20}
					onClick={ () => {
						selectCustomer({
							...data,
						})
						handleSidebar(true, 'edit')
					}}
				/>
				<Trash
					id={data.sid}
					className="cursor-pointer mr-1"
					size={20}
					onClick={() => {
						this.togglePopover()
					}}
				/>
				<Popover
					placement='top'
					target={data.sid}
					isOpen={this.state.popoverOpen}
				>
					<PopoverHeader className={'pop-confirm-header'} color={'success'}>Are you sure?</PopoverHeader>
					<PopoverBody>
						<Button
							className={'mr-1'}
							size={'sm'}
							color={'warning'}
							onClick={() => this.togglePopover()}
						>
							no
						</Button>
						<Button
							size={'sm'}
							color={'danger'}
							onClick={() => {
								deleteCustomerRequest({sid: data.sid})
								this.togglePopover()
							}}
						>
							yes
						</Button>
					</PopoverBody>
				</Popover>
			</>

		return (
			<Row className={'pt-1 pb-1'}>

				<Col xs={8} md={4}>
					<span className={'ingredient-name'}>
						{data.first_name + ' ' + (data.last_name ? data.last_name : '')}
					</span>
				</Col>
				{isMobile && <Col xs={4} className="d-block d-md-none text-align-right mb-1">
					{showActions}
				</Col>}

				<Col xs={6} className={'d-block d-md-none'}>
					<span>eMail:</span>
				</Col>
				<Col xs={6} md={2}>
					{data.email}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Phone:</span>
				</Col>
				<Col xs={6} md={2}>
					{data.phone}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Notes:</span>
				</Col>
				<Col xs={6} md={2}>
					{data.notes}
				</Col>

				<Col md={2} className={'d-none d-md-block'}>
					{showActions}
				</Col>

			</Row>
		)
	}
}

const ShowCustomers = props => {
	const {customers, handleSidebar} = props

	return (
		<Card className="table-header">
			<CardHeader>
				<div className={'container-fluid grid-header p-1 d-none d-md-block table-header-rounded'}>
					<Row>
						<Col md={4}>
							Name
						</Col>
						<Col md={2}>
							eMail
						</Col>
						<Col md={2}>
							Phone
						</Col>
						<Col md={2}>
							Notes
						</Col>
						<Col md={2}>
							Actions
						</Col>
					</Row>
				</div>
				<div className={'container-fluid'}>
					{customers.map(customer => (
						<SingleCustomer
							{...props}
							data={customer}
							key={customer.sid}
							handleSidebar={handleSidebar}
						/>
					))}
				</div>
			</CardHeader>
		</Card>
	)
}

class Customers extends React.Component {

	state = {
		sidebar: false,
		action: 'add'
	}

	componentDidMount() {
		this.props.getCustomersRequest({})
	}

	handleSidebar = (boolean, action = 'add') => {
		if (action === 'add') {
			this.props.selectCustomer({})
		}
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean)
	}

	changePage = (page) => {
		this.props.setPageParams({page})
		this.props.getCustomersDebounce({
			page,
			pageSize: this.props.pageSize
		})
	}

	render() {

		const {pageParams, setPageParams, getCustomersDebounce, sidebar, ads} = this.props
		const {page, pageSize, total} = pageParams
		const iframe = '<iframe id="iframe" />'

		return (
			<React.Fragment>

				<Breadcrumbs
					breadCrumbTitle="Customers"
					breadCrumbActive="Customers"
				/>
				<Row>
					<Col sm="12">

						<SearchBar
							{...this.props}
							sortOptions={[
								{
									label: 'Name A-Z',
									value: 'az'
								},
								{
									label: 'Name Z-A',
									value: 'za'
								},
							]}
							defaultValue={{
								label: 'Name A-Z',
								value: 'az'
							}}
							getResultsDebounce={getCustomersDebounce}
							handleSidebar={this.handleSidebar}
							pageParams={pageParams}
							setPageParams={setPageParams}
						/>

						<ShowCustomers
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
		customers,
		pageParams,
		sidebar,
	} = state.customers.toJS()
	const {
		isMobile,
		ads,
	} = state.common.toJS()
	return {
		loading,
		customers,
		pageParams,
		sidebar,
		isMobile,
		ads,
	}
}

export default connect(mapStateToProps, {
	getCustomersRequest,
	deleteCustomerRequest,
	selectCustomer,
	getCustomersDebounce,
	setPageParams,
	setSidebar,
})(Customers)
