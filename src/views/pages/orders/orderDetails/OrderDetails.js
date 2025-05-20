import React from "react"
import {
	Button,
	Card,
	CardBody,
	Row,
	Col,
	Modal,
	ModalHeader,
	ModalBody,
	Badge,
} from "reactstrap"
import {
	Edit,
	Trash,
	Plus,
} from "react-feather"
import {connect} from "react-redux"
import orderActions from "../../../../redux/orders/actions"
import commonActions from "../../../../redux/common/actions"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "../../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../../assets/scss/pages/data-list.scss"
import Sidebar from "../OrderSidebar"
import OrderItemSidebar from "./OrderItemSidebar"
import DiscountSidebar from "./DiscountSidebar"
import ScheduleSidebar from "./ScheduleSidebar"
import CompleteOrderSidebar from "./CompleteOrderSidebar";
import Moment from "react-moment";
import productActions from "../../../../redux/products/actions";
import SidebarOverlay from "../../../components/SidebarOverlay";
import variationActions from "../../../../redux/variations/actions";
import PopConfirm from "../../../components/PopConfirm";
import SingleVariation from "./variations/SingleVariation";
import Skeleton from "react-loading-skeleton";
import SearchBar from "../../../components/SearchBar";
import Pagination from "../../../components/Pagination";
import defaultCakeImg from "../../../../assets/img/other/default-cake.jpg";
import Joyride, {ACTIONS, EVENTS, STATUS} from "react-joyride";
import {getTourState, setTourState} from "../../../../helpers/utility";

const {
	getVariations,
	getVariationsDebounce,
	setPageParams,
} = variationActions

const {
	getOrderDetails,
	updateOrder,
	deleteOrder,
	getOrderItems,
	createOrderItem,
	updateOrderItem,
	deleteOrderItem,
	selectOrderItem,
	selectOrder,
	completeOrder,
	setSidebar,
	setDetailsTour,
} = orderActions

const {
	getProducts,
} = productActions

const {
	getDiscountTypesRequest,
	getOrderStatusesRequest,
} = commonActions

const CustomHeader = props => {
	return (
		<Row>
			<Col xs={12} md={4} lg={3} xl={2}>
				<Button
					block
					className="add-new-btn mb-1 set-discount"
					color="success"
					onClick={() => {
						props.handleDiscountSidebar(true)
					}}
					outline
				>
					<span className="align-middle">Set Discount</span>
				</Button>
			</Col>
			{props.selectedOrder.scheduled_event && props.selectedOrder.scheduled_event.sid === null && <Col xs={12} md={4} lg={3} xl={2}>
				<Button
					block
					className="add-new-btn mb-1 schedule-order"
					color="warning"
					onClick={() => {
						props.handleScheduleSidebar(true)
					}}
					outline
				>
					<span className="align-middle">Schedule</span>
				</Button>
			</Col>}
			{props.selectedOrder && props.selectedOrder.status && props.selectedOrder.status.value !== 4 && <Col xs={12} md={4} lg={3} xl={2}>
				<Button
					block
					className="add-new-btn mb-1 complete-order"
					color="success"
					onClick={() => {
						props.handleCompleteOrderSidebar(true)
					}}
					outline
				>
					<span className="align-middle">Complete</span>
				</Button>
			</Col>}
		</Row>
	)
}

class ShowOrderDetails extends React.Component {

	deleteItem = () => {
		this.props.deleteOrder({sid: this.props.selectedOrder.sid})
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	componentDidMount() {
		this.props.getOrderStatusesRequest()
	}

	render() {
		const { handleSidebar, selectedOrder, loading, isMobile } = this.props

		return (
			<Row>
				<Col md={12}>
					<Card className='mb-less'>
						<CardBody>
							<Row className="mb-1">
								<Col xs={8} md={5}>
									<span className="mh-4">
									{
										loading
											?
												<Skeleton />
											:
												`#${selectedOrder.order_number}`
									}
									</span>
									{selectedOrder.status ? <Badge color="success" className="badge ml-1">{selectedOrder.status.label}</Badge> : ''}
								</Col>
								{!isMobile && <Col md={5}>
									<h4>{selectedOrder.customer ? selectedOrder.customer.label : ''}</h4>
								</Col>}
								<Col xs={4} md={2} className="text-align-right">
									<Edit
										className="cursor-pointer mr-1"
										size={20}
										onClick={ () => {
											getOrderDetails({
												...selectedOrder
											})
											handleSidebar(true, 'edit')
										}}
									/>
									<Trash
										id={selectedOrder.hasOwnProperty('sid') ? selectedOrder.sid : 'nothing'}
										className="cursor-pointer mr-1"
										size={20}
										onClick={() => {
											this.triggerPopover()
										}}
									/>
									<PopConfirm
										ref={popconfirm => this.popconfirm = popconfirm}
										targetId={selectedOrder.hasOwnProperty('sid') ? selectedOrder.sid : 'nothing'}
										deleteAction={this.deleteItem}
										showPopover={this.showPopover}
									/>
								</Col>
							</Row>
							{isMobile && <Row>
								<Col xs={12}>
									<h4>{selectedOrder.customer ? selectedOrder.customer.label : ''}</h4>
								</Col>
							</Row>}
							<Row>
								<Col md={8}>
									<Row>
										<Col xs={12} md={3} className={isMobile ? 'mb-1' : ''}>
											{loading ? <Skeleton /> : 'Scheduled at:'}
										</Col>
										<Col xs={12} md={9}>
											{loading
												?
												<Skeleton />
												:
												<span>
													{
														selectedOrder.scheduled_event && selectedOrder.scheduled_event.starts_at && selectedOrder.scheduled_event.ends_at
														?
															<>
																<Moment
																	format="MM/DD/YYYY hh:mm a"
																	date={selectedOrder.scheduled_event ? selectedOrder.scheduled_event.starts_at : ''}
																/>
																<span> - </span>
																<Moment
																	format="MM/DD/YYYY hh:mm a"
																	date={selectedOrder.scheduled_event ? selectedOrder.scheduled_event.ends_at : ''}
																/>
															</>
														:
															'Not scheduled yet'
													}
												</span>
											}
										</Col>
										{selectedOrder.delivered_at && <Col xs={5} md={3}>
											{loading ? <Skeleton /> : 'Delivered at:'}
										</Col>}
										{selectedOrder.delivered_at && <Col xs={7} md={9}>
											{
												loading
													?
														<Skeleton />
													:
														<Moment
															format="MM/DD/YYYY HH:mm a"
															date={selectedOrder.delivered_at}
														/>
											}
										</Col>}
									</Row>
								</Col>
								<Col md={4}>
									<h5 className={isMobile ? 'pt-3' : ''}>Notes</h5>
									{selectedOrder.notes}
								</Col>
							</Row>
						</CardBody>
					</Card>

				</Col>
			</Row>
		)
	}
}

class SingleItem extends React.Component {

	deleteItem = () => {
		this.props.deleteOrderItem({
			pid: this.props.selectedOrder.sid,
			sid: this.props.data.sid
		})
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const { data, handleSidebar, selectOrderItem, isMobile } = this.props
		return (
			<Card>
				<CardBody>
					<Row>
						{!isMobile && <Col md={2}>
							{
								data.featured_image !== ""
									?
										<img width={80} height={'auto'} className="img-fluid mb-1" src={data.featured_image + '?d=150x150'} alt={data.name}/>
									:
										<img width={80} src={defaultCakeImg} height={'auto'} alt="featured image"/>
							}
						</Col>}
						<Col xs={8} md={8}>
							<Row>
								<h5>{data.name}</h5>
							</Row>
							{!isMobile && <Row className="mt-2">
								<strong>{parseInt(data.amount)} {data.measure_unit.name}</strong>
							</Row>}
						</Col>
						<Col xs={4} md={2}>
							<Row>
								<Col sm={12} className="text-align-right">
									<Edit
										className="cursor-pointer mr-1"
										size={20}
										onClick={ () => {
											selectOrderItem({...data})
											handleSidebar(true, 'edit')
										}}
									/>
									<Trash
										id={data.sid}
										className="cursor-pointer mr-1"
										size={20}
										onClick={() => {
											this.triggerPopover()
										}}
									/>
									<PopConfirm
										ref={popconfirm => this.popconfirm = popconfirm}
										targetId={data.sid}
										deleteAction={this.deleteItem}
										showPopover={this.showPopover}
									/>
								</Col>
							</Row>
							{!isMobile && <Row className="mt-2">
								<Col xs={12} className="font-size-medium">
									Total: <strong>{data.formatted.total}</strong>
								</Col>
							</Row>}
						</Col>
					</Row>
					{isMobile &&
					<Row className={'mt-1'}>
						<Col xs={4} className="p-0">
							{
								data.featured_image !== ""
									?
										<img width={80} height={'auto'} className="img-fluid" src={data.featured_image + '?d=150x150'} alt={data.name}/>
									:
										<img width={80} src={defaultCakeImg} height={'auto'} alt="featured image"/>
							}
						</Col>
						<Col xs={8}>
							<Row className="mt-2">
								<Col xs={6} className="text-align-right">
									Amount:
								</Col>
								<Col xs={6}>
									<strong>{parseInt(data.amount)} {data.measure_unit.name}</strong>
								</Col>
								<Col xs={6} className="text-align-right">
									Total:
								</Col>
								<Col xs={6}>
									<strong>{data.formatted.total}</strong>
								</Col>
							</Row>
						</Col>
					</Row>}
				</CardBody>
			</Card>
		)
	}
}

const ShowOrderItems = props => {
	const { orderItems, handleSidebar } = props
	return orderItems ? (orderItems.map(orderItem => (
			<SingleItem
				{...props}
				data={orderItem}
				key={orderItem.sid}
				handleSidebar={handleSidebar}
			/>
	))) : (<div/>)
}

class OrderDetails extends React.Component {

	state = {
		modal: false,
		action: 'add',
		tourStatus: getTourState(),
	}

	toggleModal = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}))
	}

	toggle = tab => {
		if (this.state.active !== tab) {
			this.setState({ active: tab })
		}
	}

	componentDidMount() {
		this.props.selectOrder({})
		this.props.getOrderDetails({sid: this.props.match.params.sid})
		this.props.getOrderItems({sid: this.props.match.params.sid})
		this.props.getProducts()
		this.props.getDiscountTypesRequest()
		this.props.getVariations()

		this.props.setDetailsTour({
				run: true,
			}
		)
	}

	handleSidebar = (boolean, action = 'add') => {
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean)
	}

	handleItemsSidebar = (boolean, action = 'add') => {
		if (action === 'add') {
			this.props.selectOrderItem({})
		}
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean, 'orderItemSidebar')
	}

	handleDiscountSidebar = (boolean) => {
		this.props.setSidebar(boolean, 'discountSidebar')
	}

	handleScheduleSidebar = (boolean) => {
		this.props.setSidebar(boolean, 'scheduleSidebar')
	}

	handleCompleteOrderSidebar = (boolean) => {
		this.props.setSidebar(boolean, 'completeOrderSidebar')
	}

	changePage = (page) => {
		this.props.setPageParams({page})
		this.props.getVariationsDebounce({
			page,
			pageSize: this.props.pageSize
		})
	}

	handleJoyrideCallback = (data) => {
		const { setDetailsTour } = this.props;
		const { action, index, type, status } = data;

		if (([STATUS.FINISHED, STATUS.SKIPPED]).includes(status)) {

			setDetailsTour({ run: false, stepIndex: 0 });
			setTourState({orderDetails: 1})
			this.setState({tourStatus: getTourState()})

		} else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND]).includes(type)) {
			const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

			if (index === 3) {
				setTimeout(() => {
					setDetailsTour({
						run: true,
						stepIndex
					});
				}, 400);
			} else {
				setDetailsTour({
					stepIndex,
				});
			}
		}
	};

	render() {

		const { run, steps, stepIndex } = this.props.detailsTour;
		const { tourStatus } = this.state;

		const {
			pageParams,
			getVariationsDebounce,
			variations,
			setPageParams,
			sidebar,
			orderItemSidebar,
			discountSidebar,
			scheduleSidebar,
			completeOrderSidebar,
			selectedOrder,
			selectOrderItem,
			isMobile,
			loading,
			setDetailsTour,
		} = this.props

		const {page, pageSize, total} = pageParams

		return (
			<React.Fragment>

				{(!tourStatus.hasOwnProperty('orderDetails') || tourStatus.orderDetails !== 1) &&
				<Joyride
					continuous={true}
					run={run}
					stepIndex={stepIndex}
					steps={steps}
					showProgress={true}
					showSkipButton={true}
					hideBackButton={true}
					callback={this.handleJoyrideCallback}
				/>}

				<Breadcrumbs
					breadCrumbTitle="Order Details"
					breadCrumbParent="Orders"
					parentLink="/orders"
					breadCrumbActive="Order Details"
				/>

				<Modal
					isOpen={this.state.modal}
					toggle={this.toggleModal}
					className="modal-dialog-centered modal-lg"
				>
					<ModalHeader toggle={this.toggleModal} className="bg-primary">
						Add order item
					</ModalHeader>
					<ModalBody className="">
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
								{
									label: 'Newest First',
									value: 'desc'
								},
								{
									label: 'Oldest First',
									value: 'asc'
								},
								{
									label: 'Higher Price First',
									value: 'hp'
								},
								{
									label: 'Lower Price First',
									value: 'lp'
								},
							]}
							defaultValue={{
								label: 'Name A-Z',
								value: 'az'
							}}
							showAddButton={false}
							getResultsDebounce={getVariationsDebounce}
							handleSidebar={this.handleSidebar}
							pageParams={pageParams}
							setPageParams={setPageParams}
						/>
						<div className="ecommerce-application">
							<div className="grid-view wishlist-items">
								{variations.map(variation => {
									return (
										<SingleVariation
											{...this.props}
											toggleModal={this.toggleModal}
											item={variation}
											key={variation.sid}
										/>
									)
								})}
							</div>
						</div>
						<Pagination
							changePage={this.changePage}
							currentPage={page}
							pageSize={pageSize}
							total={total}
						/>
					</ModalBody>
				</Modal>

				<Row>
					<Col sm="12">

						<CustomHeader
							{...this.props}
							toggleModal={this.toggleModal}
							handleSidebar={this.handleItemsSidebar}
							handleDiscountSidebar={this.handleDiscountSidebar}
							handleScheduleSidebar={this.handleScheduleSidebar}
							handleCompleteOrderSidebar={this.handleCompleteOrderSidebar}
						/>

						<ShowOrderDetails
							{...this.props}
							handleSidebar={this.handleSidebar}
						/>

						<Row>
							<Col>
								<Button
									block={isMobile}
									className="add-new-btn mb-1 add-order-item"
									color="primary"
									onClick={() => {
										setDetailsTour({
											run: stepIndex === 3 ? false : run,
											stepIndex: stepIndex === 3 ? 4 : stepIndex,
										})
										selectOrderItem({})
										this.toggleModal()
									}}

								>
									<Plus size={15}/>
									<span className="align-middle">Add Item</span>
								</Button>
							</Col>
						</Row>

						<Row>
							<Col md={8}>

								<ShowOrderItems
									{...this.props}
									handleSidebar={this.handleItemsSidebar}
								/>
							</Col>

							<Col md={4}>
								<Card>
									<CardBody>
										<Row>
											<Col xs={7} md={8} className="text-align-right">
												{loading ? <Skeleton /> : 'Sub total:'}
											</Col>
											<Col xs={5} md={4}>
												{loading ? <Skeleton /> : selectedOrder.formatted && selectedOrder.formatted.sub_total}
											</Col>
										</Row>
										<Row>
											<Col xs={7} md={8} className="text-align-right">
												{
													loading
														?
															<Skeleton />
														:
															selectedOrder.discount_type && selectedOrder.discount_type.id === 'percentage'
																?
																	`Discount (${parseInt(selectedOrder.discount_value)}%)`
																:
																	`Discount ($${selectedOrder.discount_value})`
												}
											</Col>
											<Col xs={5} md={4}>
												{loading ? <Skeleton /> : selectedOrder.formatted && `${selectedOrder.formatted.discount}`}
											</Col>
										</Row>
										<Row>
											<Col xs={7} md={8} className="text-align-right">
												{loading ? <Skeleton /> : 'Handling and shipping:'}
											</Col>
											<Col xs={5} md={4}>
												{loading ? <Skeleton /> : selectedOrder.formatted && selectedOrder.formatted.handling_shipping}
											</Col>
										</Row>
										<Row>
											<Col xs={7} md={8} className="text-align-right">
												{loading ? <Skeleton /> : 'Taxes:'}
											</Col>
											<Col xs={5} md={4}>
												{loading ? <Skeleton /> : selectedOrder.formatted && selectedOrder.formatted.taxes}
											</Col>
										</Row>
										<Row>
											<Col md={12}>
												<hr />
											</Col>
										</Row>
										<Row className="mh-4">
											<Col xs={7} md={8}>
												{loading ? <Skeleton /> : 'Total:'}
											</Col>
											<Col xs={5} md={4}>
												<strong>{loading ? <Skeleton /> : selectedOrder.formatted ? selectedOrder.formatted.grand_total : ''}</strong>
											</Col>
										</Row>
									</CardBody>
								</Card>
							</Col>
						</Row>

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

							<OrderItemSidebar
								variations={this.props.variations}
								orderItems={this.props.orderItems}
								show={orderItemSidebar}
								handleSidebar={this.handleItemsSidebar}
								action={this.state.action}
							/>
							<SidebarOverlay
								sidebar={orderItemSidebar}
								handleSidebar={this.handleItemsSidebar}
							/>

							<DiscountSidebar
								{...this.props}
								show={discountSidebar}
								handleSidebar={this.handleDiscountSidebar}
							/>
							<SidebarOverlay
								sidebar={discountSidebar}
								handleSidebar={this.handleDiscountSidebar}
							/>

							<ScheduleSidebar
								{...this.props}
								show={scheduleSidebar}
								handleSidebar={this.handleScheduleSidebar}
							/>
							<SidebarOverlay
								sidebar={scheduleSidebar}
								handleSidebar={this.handleScheduleSidebar}
							/>

							<CompleteOrderSidebar
								{...this.props}
								show={completeOrderSidebar}
								handleSidebar={this.handleCompleteOrderSidebar}
							/>
							<SidebarOverlay
								sidebar={completeOrderSidebar}
								handleSidebar={this.handleCompleteOrderSidebar}
							/>
						</div>
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	const {
		loading,
		selectedOrder,
		orderItems,
		selectedOrderItem,
		selectedDiscount,
		sidebar,
		orderItemSidebar,
		discountSidebar,
		scheduleSidebar,
		completeOrderSidebar,
		detailsTour,
	} = state.orders.toJS()
	const {
		variations,
		pageParams,
	} = state.variation.toJS()
	const {
		products,
	} = state.products.toJS()
	const {
		discountTypes,
		orderStatuses,
		isMobile,
	} = state.common.toJS()
	return {
		loading,
		selectedOrder,
		orderItems,
		selectedOrderItem,
		products,
		discountTypes,
		selectedDiscount,
		orderStatuses,
		variations,
		pageParams,
		sidebar,
		orderItemSidebar,
		discountSidebar,
		scheduleSidebar,
		completeOrderSidebar,
		isMobile,
		detailsTour,
	}
}

export default connect(mapStateToProps, {
	getVariations,
	updateOrder,
	deleteOrder,
	getOrderItems,
	createOrderItem,
	updateOrderItem,
	deleteOrderItem,
	getOrderDetails,
	selectOrderItem,
	getOrderStatusesRequest,
	getProducts,
	getDiscountTypesRequest,
	selectOrder,
	getVariationsDebounce,
	setPageParams,
	completeOrder,
	setSidebar,
	setDetailsTour,
})(OrderDetails)
