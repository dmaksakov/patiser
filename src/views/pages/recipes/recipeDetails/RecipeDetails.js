import React from "react"
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Row,
	Col,
} from "reactstrap"
import {
	Edit,
	Trash,
	Plus,
} from "react-feather"
import {connect} from "react-redux"
import recipeActions from "../../../../redux/recipes/actions"
import companyActions from "../../../../redux/company/actions"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "../../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../../assets/scss/pages/data-list.scss"
import RecipeItemSidebar from "./RecipeDetailsSidebar"
import RecipeSidebar from "../RecipeSidebar"
import SidebarOverlay from "../../../components/SidebarOverlay";
import PopConfirm from "../../../components/PopConfirm";
import RecipeCostPie from "../../../components/recipe/RecipeCostPie";
import Joyride, {STATUS} from "react-joyride";
import {getTourState, setTourState} from "../../../../helpers/utility";

const {
	getRecipeItems,
	getRecipesRequest,
	deleteRecipeItem,
	selectRecipe,
	deleteRecipeRequest,
	selectRecipeItem,
	setSidebar,
	setItemSidebar,
	setTour,
} = recipeActions

const {
	getCompanyMeasureUnits,
} = companyActions

const CustomHeader = props => {
	return (
		<div >
			<Button
				className="add-new-btn mb-1 recipe-add-ingredient"
				color="success"
				onClick={() => props.handleRecipeItemSidebar(true, 'add')}
				block={props.isMobile}
			>
				<Plus size={15}/>
				<span className="align-middle">Add Recipe Ingredient</span>
			</Button>
		</div>
	)
}

class SingleRecipeItem extends React.Component {

	deleteItem = () => {
		this.props.deleteRecipeItem(
	{
				sid: this.props.recipes.filter(recipe => recipe.sid === this.props.match.params.sid)[0].sid,
				ingredient: this.props.item.sid
			}
		)
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const {item, handleRecipeItemSidebar, isMobile} = this.props

		const showActions =
			<>
				<Edit
					className="cursor-pointer mr-1"
					size={20}
					onClick={ () => {
						this.props.selectRecipeItem({
							...item,
							ingredient: {
								label: item.name,
								value: item.product_sid
							},
							measure_unit: {
								label: item.measure_unit.name,
								value: item.measure_unit.id
							}
						})
						handleRecipeItemSidebar(true, 'edit')
					}}
				/>
				<Trash
					id={item.sid}
					className="cursor-pointer mr-1"
					size={20}
					onClick={() => {
						this.triggerPopover()
					}}
				/>
				<PopConfirm
					ref={popconfirm => this.popconfirm = popconfirm}
					targetId={item.sid}
					deleteAction={this.deleteItem}
					showPopover={this.showPopover}
				/>
			</>

		return (
			<Row className={'pt-1 pb-1'}>

				<Col xs={8} md={2} lg={4}>
					<h4>{item.name}</h4>
				</Col>
				{isMobile && <Col xs={4} className="d-block d-md-none text-align-right mb-1">
					{showActions}
				</Col>}

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Amount:</span>
				</Col>
				<Col xs={6} md={2}>
					{item.amount} {item.measure_unit.name}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Cost per unit:</span>
				</Col>
				<Col xs={6} md={2}>
					{item.formatted.cost_per_unit}/ea
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Cost total:</span>
				</Col>
				<Col xs={6} md={2}>
					Total: {item.formatted.cost_total}
				</Col>

				<Col md={2} lg={2} className={'d-none d-md-block'}>
					{showActions}
				</Col>

			</Row>
		)
	}
}

class RecipeSummary extends React.Component {

	deleteItem = () => {
		this.props.deleteRecipeRequest({sid: this.props.recipes.filter(recipe => recipe.sid === this.props.match.params.sid)[0].sid}, this.props.history)
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}
	render() {
		let selectedRecipes = this.props.recipes.filter(recipe => recipe.sid === this.props.match.params.sid)
		if (this.props.recipes.length && selectedRecipes.length) {
			const selectedRecipe = selectedRecipes[0]
			return (
				<Card>
					<CardHeader>
						<CardTitle className="recipe-details-title">
							{selectedRecipe && selectedRecipe.name}
						</CardTitle>
						<Row>
							<Col sm={12}>
								<Edit
									className="cursor-pointer mr-1"
									size={20}
									onClick={ () => {
										this.props.selectRecipe({
											...selectedRecipe,
										})
										this.props.handleRecipeSidebar(true, 'edit')
									}}
								/>
								<Trash
									id={selectedRecipe.sid}
									className="cursor-pointer mr-1"
									size={20}
									onClick={() => {
										this.triggerPopover()
									}}
								/>
								<PopConfirm
									ref={popconfirm => this.popconfirm = popconfirm}
									targetId={selectedRecipe.sid}
									deleteAction={this.deleteItem}
									showPopover={this.showPopover}
								/>
							</Col>
						</Row>
					</CardHeader>
					<CardBody>


					</CardBody>
				</Card>
			)
		} else {
			return (
				<div/>
			)
		}
	}
}

const ShowRecipeItems = props => {
	const {recipeItems, handleRecipeItemSidebar} = props

	return (
		<Card className="table-header recipe-ingredients-list">
			<CardHeader>
				<div className={'container-fluid grid-header p-1 d-none d-md-block table-header-rounded'}>
					<Row>
						<Col md={2} lg={4}>
							Name
						</Col>
						<Col md={2}>
							Amount
						</Col>
						<Col md={2}>
							Cost per unit
						</Col>
						<Col md={2}>
							Cost total
						</Col>
						<Col md={2} lg={2}>
							Actions
						</Col>
					</Row>
				</div>
				<div className={'container-fluid'}>
					{recipeItems.map(recipeItem => (
						<SingleRecipeItem
							{...props}
							item={recipeItem}
							key={recipeItem.sid}
							handleRecipeItemSidebar={handleRecipeItemSidebar}
						/>
					))}
				</div>
			</CardHeader>
		</Card>
	)
}

class RecipeDetails extends React.Component {

	state = {
		sidebar: false,
		recipeSidebar: false,
		action: 'add',
		tourStatus: getTourState(),
	}

	componentDidMount() {
		if (!this.props.recipes.length) {
			this.props.getRecipesRequest()
		}
		this.props.getRecipeItems({sid: this.props.match.params.sid})
		this.props.getCompanyMeasureUnits()

		let steps = [
			{
				content: <div>Recipe title. Use the buttons to the right to edit/delete the recipe</div>,
				placement: 'left',
				target: '.recipe-details-title',
				title: 'Recipe title',
				disableBeacon: true,
			},
			{
				content: <div>Recipe related expenses</div>,
				placement: 'left',
				target: '.recipe-details-expenses',
			},
			{
				content: <div>Use this button to add an ingredient to the recipe.
					Please make sure the ingredient is added to the ingredient database first (use the Ingredients page)
				</div>,
				placement: 'left',
				target: '.recipe-add-ingredient',
			}]

		if (!this.props.isMobile) {
			steps.push(
				{
					content: <div>List of the recipe ingredients</div>,
					placement: 'left',
					target: '.recipe-ingredients-list',
				}
			)
		}

		this.props.setTour(
			{
				steps: steps,

			})
	}

	handleRecipeItemSidebar = (boolean, action = 'add') => {
		if (action === 'add') {
			this.props.selectRecipeItem({})
		}
		this.setState({
			action: action
		})
		this.props.setItemSidebar(boolean)
	}

	handleRecipeSidebar = (boolean, action = 'add') => {

		this.setState({
			action: action
		})
		this.props.setSidebar(boolean)
	}

	handleJoyrideCallback = data => {
		const { status } = data;

		if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
			setTourState({recipeDetails: 1})
		}
	};

	render() {

		const { sidebar, itemSidebar } = this.props
		const { run, steps, stepIndex } = this.props.tour;
		const selectedRecipe = this.props.recipes.filter(recipe => recipe.sid === this.props.match.params.sid)[0]
		const { tourStatus } = this.state;

		return (
			<React.Fragment>
				{(!tourStatus.hasOwnProperty('recipeDetails') || tourStatus.recipeDetails !== 1) &&
				<Joyride
					continuous={true}
					steps={steps}
					showProgress={true}
					showSkipButton={true}
					hideBackButton={true}
					callback={this.handleJoyrideCallback}
				/>}

				<Breadcrumbs
					breadCrumbTitle="Recipe Details"
					breadCrumbParent="Recipes"
					parentLink={'/recipes'}
					breadCrumbActive="Recipe Details"
				/>
				<Row>
					<Col xs={12} lg={8}>

						<RecipeSummary
							{...this.props}
							handleRecipeSidebar={this.handleRecipeSidebar}
						/>

						<CustomHeader
							{...this.props}
							handleRecipeItemSidebar={this.handleRecipeItemSidebar}
						/>

						<ShowRecipeItems
							{...this.props}
							handleRecipeItemSidebar={this.handleRecipeItemSidebar}
						/>

						<div className={`data-list list-view`}>
							<RecipeItemSidebar
								{...this.props}
								show={itemSidebar}
								handleSidebar={this.handleRecipeItemSidebar}
								action={this.state.action}
							/>
							<SidebarOverlay
								sidebar={itemSidebar}
								handleSidebar={this.handleRecipeItemSidebar}
							/>
							<RecipeSidebar
								{...this.props}
								show={sidebar}
								handleSidebar={this.handleRecipeSidebar}
								action={this.state.action}
							/>
							<SidebarOverlay
								sidebar={sidebar}
								handleSidebar={this.handleRecipeSidebar}
							/>
						</div>
					</Col>
					<Col xs={12} lg={4} className="recipe-details-expenses">
						<Row>
							<Col xs={12}>
								<Card>
									<CardHeader>
										<h5>Expense Chart</h5>
									</CardHeader>
									<CardBody>
										{selectedRecipe && <Row>
											<Col xs={12}>
												{this.props.isMobile && <hr/>}

												<RecipeCostPie
													labels={['Ingredients', 'Labor', 'Other Expenses']}
													series={[
														parseFloat(selectedRecipe.ingredients_cost),
														parseFloat(selectedRecipe.labor_cost),
														parseFloat(selectedRecipe.expenses)
													]
													}
												/>
											</Col>
										</Row>}
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								<Card>
									<CardHeader>
									</CardHeader>
									{selectedRecipe && <CardBody>
										<Row>
											<Col xs={12}>
												{selectedRecipe.description &&
												<Row>
													<Col xs={6} lg={3}>
														Description:
													</Col>
													<Col xs={6} lg={3} className="font-weight-bold">
														{selectedRecipe.description}
													</Col>
												</Row>}
												<Row>
													<Col>
														Expenses:
													</Col>
													<Col className="font-weight-bold">
														{selectedRecipe.formatted.expenses}
													</Col>
												</Row>
												<Row>
													<Col>
														Labor cost:
													</Col>
													<Col className="font-weight-bold">
														{selectedRecipe.formatted.labor_cost}
													</Col>
												</Row>
												<Row>
													<Col>
														Ingredients cost:
													</Col>
													<Col className="font-weight-bold">
														{selectedRecipe.formatted.ingredients_cost}
													</Col>
												</Row>
												<Row>
													<Col>
														Total cost:
													</Col>
													<Col className="font-weight-bold">
														{selectedRecipe.formatted.total_cost}
													</Col>
												</Row>
												<Row>
													<Col>
														Yield:
													</Col>
													<Col className="font-weight-bold">
														{selectedRecipe.yield} {selectedRecipe.yield_measure_unit.label}
													</Col>
												</Row>
											</Col>
										</Row>
									</CardBody>}
								</Card>
							</Col>
						</Row>
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
		recipeDetails,
		recipeItems,
		selectedRecipeItem,
		sidebar,
		itemSidebar,
		tour,
	} = state.recipes.toJS()
	const {
		isMobile,
	} = state.common.toJS()
	return {
		loading,
		recipes,
		recipeDetails,
		recipeItems,
		selectedRecipeItem,
		measureUnits: state.company.toJS().companyMeasureUnits,
		sidebar,
		itemSidebar,
		isMobile,
		tour,
	}
}

export default connect(mapStateToProps, {
	getRecipesRequest,
	getRecipeItems,
	deleteRecipeItem,
	getCompanyMeasureUnits,
	selectRecipe,
	deleteRecipeRequest,
	selectRecipeItem,
	setSidebar,
	setItemSidebar,
	setTour,
})(RecipeDetails)
