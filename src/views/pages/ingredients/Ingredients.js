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
import ingredientsActions from "../../../redux/ingredients/actions"
import companyActions from "../../../redux/company/actions"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import Sidebar from "./IngredientSidebar"
import SidebarOverlay from "../../components/SidebarOverlay"
import Skeleton from "react-loading-skeleton"
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import {getTourState, setTourState} from "../../../helpers/utility";
import {IFrameAd} from "../IFrameAd";

const {
	getIngredientsRequest,
	selectIngredient,
	deleteIngredientsRequest,
	getIngredientsDebounce,
	setPageParams,
	setSidebar,
	setTour,
} = ingredientsActions

const {
	getCompanyMeasureUnits,
} = companyActions

class SingleIngredient extends React.Component {

	state = {
		popoverOpen: false,
	}

	togglePopover = () => {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		})
	}

	render() {
		const { data, handleSidebar, selectIngredient, deleteIngredientsRequest, loading, isMobile } = this.props

		const showActions =
			<>
				<Edit
					className="cursor-pointer mr-1"
					size={20}
					onClick={ () => {
						selectIngredient({
							...data,
							measure_unit: {
								value: data.measure_unit.id,
								label: data.measure_unit.name
							}
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
								deleteIngredientsRequest({sid: data.sid})
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
					<Col xs={8} md={2}>
						{loading ? <Skeleton /> : <span className={'ingredient-name'}>{data.name}</span>}
					</Col>
					{isMobile && <Col xs={4} className="d-block d-md-none text-align-right mb-1">
						{showActions}
					</Col>}
					<Col xs={6} md={2} className={'d-block d-md-none'}>
						<span>Amount:</span>
					</Col>
					<Col xs={6} md={2}>
						{data.amount}
					</Col>
					<Col xs={6} md={2} className={'d-block d-md-none'}>
						<span>Price:</span>
					</Col>
					<Col xs={6} md={2}>
						<span>{data.formatted.price}</span>
					</Col>
					<Col xs={6} md={2} className={'d-block d-md-none'}>
						<span>Price per unit:</span>
					</Col>
					<Col xs={6} md={2}>
						{data.formatted.price_per_unit_full}
					</Col>
					<Col xs={6} md={2} className={'d-block d-md-none'}>
						<span>Measure unit:</span>
					</Col>
					<Col xs={6} md={2}>
						{data.measure_unit.name}
					</Col>
					<Col xs={12} md={2} className={'d-none d-md-block'}>
						{showActions}
					</Col>
				</Row>
		)
	}
}

const ShowIngredients = props => {
	const {ingredients, handleSidebar} = props

	return (
		<Card className="table-header">
			<CardHeader>
				<div className="container-fluid grid-header p-1 d-none d-md-block table-header-rounded">
					<Row>
						<Col md={2}>
							Name
						</Col>
						<Col md={2}>
							Amount
						</Col>
						<Col md={2}>
							Price
						</Col>
						<Col md={2}>
							Price per unit
						</Col>
						<Col md={2}>
							Measure unit
						</Col>
						<Col md={2}>
							Actions
						</Col>
					</Row>
				</div>
				<div className={'container-fluid'}>
					{ingredients.map(ingredient => (
						<SingleIngredient
							{...props}
							data={ingredient}
							key={ingredient.sid}
							handleSidebar={handleSidebar}
						/>
					))}
				</div>
			</CardHeader>
		</Card>
	)
}

class Ingredients extends React.Component {

	state = {
		action: 'add',
		tourStatus: getTourState(),
	}

	componentDidMount() {
		this.props.setTour(
			{
				run: true,
				steps: [
					{
						content: (
							<div>
								Click on the button to add the ingredient
							</div>
						),
						disableBeacon: true,
						disableOverlayClose: true,
						hideCloseButton: true,
						hideFooter: true,
						placement: 'bottom',
						spotlightClicks: true,
						target: '.add-new',
						title: 'Add ingredient',
					},
					{
						content: <div>Enter your ingredient details here</div>,
						placement: 'left',
						target: '.field-ingredient',
						title: 'Fill the form out',
						spotlightPadding: 7,
					},
				]
			});

		this.props.getIngredientsRequest({})
		this.props.getCompanyMeasureUnits()
	}

	handleJoyrideCallback = (data) => {
		const { sidebar, setSidebar, setTour } = this.props;
		const { action, index, type, status } = data;

		if (([STATUS.FINISHED, STATUS.SKIPPED]).includes(status)) {
			// Need to set our running state to false, so we can restart if we click start again.
			setTour({ run: false, stepIndex: 0 });
			setTourState({ingredients: 1})
		} else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND]).includes(type)) {
			const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

			if (index === 0) {
				setTimeout(() => {
					setTour({ run: true });
				}, 400);
			} else {
				// Update state to advance the tour
				setTour({
					stepIndex,
				});
			}
		}
	};

	handleSidebar = (boolean, action = 'add') => {
		if (action === 'add') {
			this.props.selectIngredient({})
		}
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean)
	}

	changePage = (page) => {
		this.props.setPageParams({page})
		this.props.getIngredientsDebounce({
			page,
			pageSize: this.props.pageSize
		})
	}

	render() {

		const {getIngredientsDebounce, pageParams, setPageParams, sidebar, ads} = this.props
		const {page, pageSize, total} = pageParams
		const { run, steps, stepIndex } = this.props.tour;
		const {tourStatus} = this.state
		const iframe = '<iframe id="iframe" />'

		return (
			<React.Fragment>
				{(!tourStatus.hasOwnProperty('ingredients') || tourStatus.ingredients !== 1) &&
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
					styles={{
						options: {
							// arrowColor: '#e3ffeb',
							// backgroundColor: 'transparent',
							// overlayColor: 'rgba(79, 26, 0, 0.4)',
							// primaryColor: '#000',
							// textColor: '#004a14',
							// width: 900,
							zIndex: 1000,
						}
					}}
				/>}

				<Breadcrumbs
					breadCrumbTitle="Ingredients"
					breadCrumbActive="Ingredients"
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
							getResultsDebounce={getIngredientsDebounce}
							handleSidebar={this.handleSidebar}
							pageParams={pageParams}
							setPageParams={setPageParams}
						/>

						<ShowIngredients
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
							adCode={ads.lowTier}
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
		ingredients,
		page,
		pageSize,
		total,
		pageParams,
		sidebar,
		tour,
	} = state.ingredients.toJS()
	const {
		isMobile,
		ads,
	} = state.common.toJS()
	return {
		loading,
		ingredients,
		page,
		pageSize,
		total,
		pageParams,
		sidebar,
		isMobile,
		tour,
		ads,
	}
}

export default connect(mapStateToProps, {
	getIngredientsRequest,
	selectIngredient,
	deleteIngredientsRequest,
	getCompanyMeasureUnits,
	getIngredientsDebounce,
	setPageParams,
	setSidebar,
	setTour,
})(Ingredients)
