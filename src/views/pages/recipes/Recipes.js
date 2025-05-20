import React from "react"
import {Button, Card, CardHeader, Col, Popover, PopoverBody, PopoverHeader, Row} from "reactstrap"
import {Edit, Trash,} from "react-feather"
import {connect} from "react-redux"
import recipeActions from "../../../redux/recipes/actions"
import companyActions from "../../../redux/company/actions"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import Sidebar from "./RecipeSidebar"
import SidebarOverlay from "../../components/SidebarOverlay";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import Skeleton from "react-loading-skeleton";
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import {getTourState, setTourState} from "../../../helpers/utility";
import {IFrameAd} from "../IFrameAd";

const {
	getRecipesRequest,
	deleteRecipeRequest,
	selectRecipe,
	getRecipesDebounce,
	setPageParams,
	setSidebar,
	setTour,
} = recipeActions

const {
	getCompanyMeasureUnits,
} = companyActions

class SingleRecipe extends React.Component {

	state = {
		popoverOpen: false,
	}

	togglePopover = () => {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		})
	}

	render() {
		const {data, handleSidebar, selectRecipe, deleteRecipeRequest, loading, isMobile} = this.props

		const showActions =
				<>
					<Edit
						className="cursor-pointer mr-05"
						size={20}
						onClick={() => {
							selectRecipe({
								...data,
							})
							handleSidebar(true, 'edit')
						}}
					/>
					<Trash
						id={data.sid}
						className="cursor-pointer mr-05"
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
									deleteRecipeRequest({sid: data.sid})
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

				<Col xs={8} md={2} lg={3}>
					{loading
						?
							<Skeleton />
						:
							<span
								onClick={() => {
									setTour({run: false, stepIndex: 0})
									setTourState({recipes2: 1})
									this.props.history.push(`/recipes/${data.sid}`)
								}}
								className={'ingredient-name'}
							>
								<a href='#'>{data.name}</a>
							</span>
					}
				</Col>
				{isMobile && <Col xs={4} className="d-block d-md-none text-align-right mb-1">
					{showActions}
				</Col>}

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Expenses:</span>
				</Col>
				<Col xs={6} md={2}>
					{data.formatted.expenses}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Ingredients cost:</span>
				</Col>
				<Col xs={6} md={2}>
					{data.formatted.ingredients_cost}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Labor cost:</span>
				</Col>
				<Col xs={6} md={2}>
					{data.formatted.labor_cost}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Labor cost:</span>
				</Col>
				<Col xs={6} md={2} lg={2}>
					{data.labor_time + ' Hrs'}
				</Col>

				<Col md={2} lg={1} className={'d-none d-md-block'}>
					{showActions}
				</Col>

			</Row>
		)
	}
}

const ShowRecipes = props => {
	const {recipes, handleSidebar} = props

	return (
		<Card className="table-header">
			<CardHeader>
				<div className={'container-fluid grid-header p-1 d-none d-md-block table-header-rounded'}>
					<Row>
						<Col md={2} lg={3}>
							Name
						</Col>
						<Col md={2}>
							Expenses
						</Col>
						<Col md={2}>
							Ingredients cost
						</Col>
						<Col md={2}>
							Labor cost
						</Col>
						<Col md={2} lg={2}>
							Labor time
						</Col>
						<Col md={2} lg={1}>
							Actions
						</Col>
					</Row>
				</div>
				<div className={'container-fluid'}>
					{recipes.map(recipe => (
						<SingleRecipe
							{...props}
							data={recipe}
							key={recipe.sid}
							handleSidebar={handleSidebar}
						/>
					))}
				</div>
			</CardHeader>
		</Card>
	)

}

class Recipes extends React.Component {

	state = {
		action: 'add',
		tourStatus: getTourState(),
	}

	componentDidMount() {

		this.props.getRecipesRequest({})
		this.props.getCompanyMeasureUnits()

		this.props.setTour({run: true});
	}

	handleJoyrideCallback = (data) => {
		const { setSidebar, setTour } = this.props;
		const { action, index, type, status } = data;

		if (([STATUS.FINISHED, STATUS.SKIPPED]).includes(status)) {

			setTour({ run: false, stepIndex: 0 });
			setTourState({recipes: 1})
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

	handleSidebar = (boolean, action = 'add') => {
		if (action === 'add') {
			this.props.selectRecipe({})
		}
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean)
	}

	changePage = (page) => {
		this.props.setPageParams({page})
		this.props.getRecipesDebounce({
			page,
			pageSize: this.props.pageSize
		})
	}

	render() {

		const {getRecipesDebounce, pageParams, setPageParams, sidebar, recipes, ads} = this.props
		const {page, pageSize, total} = pageParams
		const { run, steps, steps2, stepIndex } = this.props.tour;
		const {tourStatus} = this.state
		const iframe = '<iframe id="iframe" />'

		return (
			<React.Fragment>

				{(!tourStatus.hasOwnProperty('recipes') || tourStatus.recipes !== 1) &&
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


				{ tourStatus.recipes === 1 && (!tourStatus.hasOwnProperty('recipes2') || tourStatus.recipes2 !== 1) && recipes.length === 1 &&
				<Joyride
					continuous={true}
					run={run}
					steps={steps2}
					stepIndex={stepIndex}
					scrollToFirstStep={true}
					callback={this.handleJoyrideCallback}
				/>}

				<Breadcrumbs
					breadCrumbTitle="Recipes"
					breadCrumbActive="Recipes"
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
							getResultsDebounce={getRecipesDebounce}
							handleSidebar={this.handleSidebar}
							pageParams={pageParams}
							setPageParams={setPageParams}/>

						<ShowRecipes
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
		recipes,
		page,
		pageSize,
		total,
		pageParams,
		sidebar,
		tour,
	} = state.recipes.toJS()
	const {
		isMobile,
		ads,
	} = state.common.toJS()
	return {
		page,
		pageSize,
		total,
		loading,
		recipes,
		measureUnits: state.company.toJS().companyMeasureUnits,
		pageParams,
		sidebar,
		isMobile,
		tour,
		ads,
	}
}

export default connect(mapStateToProps, {
	getRecipesRequest,
	deleteRecipeRequest,
	selectRecipe,
	getCompanyMeasureUnits,
	getRecipesDebounce,
	setPageParams,
	setSidebar,
	setTour,
})(Recipes)
