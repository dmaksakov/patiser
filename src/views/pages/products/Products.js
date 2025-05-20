import React from "react"
import {
	Card,
	CardHeader,
	Row,
	Col,
} from "reactstrap"
import {
	Edit,
	Trash,
} from "react-feather"
import {connect} from "react-redux"
import productActions from "../../../redux/products/actions"
import categoryActions from "../../../redux/categories/actions";
import commonActions from "../../../redux/common/actions"
import taxActions from "../../../redux/taxes/actions";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import Sidebar from "./ProductSidebar"
import SidebarOverlay from "../../components/SidebarOverlay";
import PopConfirm from "../../components/PopConfirm";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import {getTourState, setTourState} from "../../../helpers/utility";
import {IFrameAd} from "../IFrameAd";

const {
	getProducts,
	getProductDetails,
	deleteProduct,
	selectProduct,
	deleteVariableProduct,
	getProductsDebounce,
	setPageParams,
	setSidebar,
	setTour,
} = productActions

const {
	getTaxCategories,
} = taxActions

const {
	getProductCategories,
} = categoryActions

const {
	getMeasureSystemRequest
} = commonActions

class SingleProduct extends React.Component {

	deleteItem = () => {
		if (this.props.selectedProduct.is_variable) {
			this.props.deleteVariableProduct({sid: this.props.data.sid})
		} else {
			this.props.deleteProduct({sid: this.props.data.sid})
		}
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const {data, handleSidebar, getProductDetails, history, isMobile} = this.props

		const showActions =
			<>
				<Edit
					className="cursor-pointer mr-1"
					size={20}
					onClick={ () => {
						getProductDetails({...data})
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
				/>			</>

		return (
			<Row className={'pt-1 pb-1'}>
				<Col xs={8} md={2} lg={3}>
					<span className={'ingredient-name'} onClick={() => {
						setTour({run: false, stepIndex: 0})
						setTourState({products2: 1})
						history.push(`/products/${data.sid}`)
					}}>
						<a href='#'>{data.name}</a>
					</span>
				</Col>
				{isMobile && <Col xs={4} className="d-block d-md-none text-align-right mb-1">
					{showActions}
				</Col>}

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Variable:</span>
				</Col>
				<Col xs={6} md={1}>
					{data.is_variable ? 'Yes' : 'No'}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Recipe based:</span>
				</Col>
				<Col xs={6} md={2}>
					{data.is_recipe_based ? 'Yes' : 'No'}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Category:</span>
				</Col>
				<Col xs={6} md={2}>
					{data.category.name}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					<span>Tax category:</span>
				</Col>
				<Col xs={6} md={2}>
					{data.tax_category.name}
				</Col>

				<Col md={2} className={'d-none d-md-block'}>
					{showActions}
				</Col>

			</Row>
		)
	}
}

const ShowProducts = props => {
	const {products, handleSidebar} = props

	return (
		<Card className="table-header">
			<CardHeader>
				<div className={'container-fluid grid-header p-1 d-none d-md-block table-header-rounded'}>
					<Row>
						<Col md={2} lg={3}>
							Name
						</Col>
						<Col md={1}>
							Variable
						</Col>
						<Col md={2}>
							Recipe based
						</Col>
						<Col md={2}>
							Category
						</Col>
						<Col md={2} lg={2}>
							Tax category
						</Col>
						<Col md={2}>
							Actions
						</Col>
					</Row>
				</div>
				<div className={'container-fluid'}>
					{products.map(product => (
						<SingleProduct
							{...props}
							data={product}
							key={product.sid}
							handleSidebar={handleSidebar}
						/>
					))}
				</div>
			</CardHeader>
		</Card>
	)

}

class Products extends React.Component {

	state = {
		sidebar: false,
		action: 'add',
		tourStatus: getTourState(),
	}

	componentDidMount() {

		this.props.getProducts({})
		this.props.getProductCategories({})
		this.props.getTaxCategories()

		this.props.setTour({run: true,});
	}

	handleJoyrideCallback = (data) => {
		const { setSidebar, setTour } = this.props;
		const { action, index, type, status } = data;

		if (([STATUS.FINISHED, STATUS.SKIPPED]).includes(status)) {

			setTour({ run: false, stepIndex: 0 });
			setTourState({products: 1})
			this.setState({tourStatus: getTourState()})

		} else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND]).includes(type)) {
			const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

			if (index === 0) {
				setTimeout(() => {
					setTour({run: true});
				}, 400);
			}
			else if (index === 5) {
				// setSidebar(false)
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
			this.props.selectProduct({})
		}
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean)
	}

	changePage = (page) => {
		this.props.setPageParams({page})
		this.props.getProductsDebounce({
			page,
			pageSize: this.props.pageSize
		})
	}

	render() {

		const {pageParams, getProductsDebounce, setPageParams, sidebar, taxCategories, products, ads} = this.props
		const {page, pageSize, total} = pageParams
		const { run, steps, steps2, stepIndex } = this.props.tour;
		const {tourStatus} = this.state
		const iframe = '<iframe id="iframe" />'

		return (
			<React.Fragment>

				{(!tourStatus.hasOwnProperty('products') || tourStatus.products !== 1) &&
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

				{tourStatus.products === 1 && !tourStatus.hasOwnProperty('products2') && products.length === 1 &&
				<Joyride
					continuous={true}
					run={run}
					steps={steps2}
					stepIndex={stepIndex}
					scrollToFirstStep={true}
					callback={this.handleJoyrideCallback}
				/>}

				<Breadcrumbs
					breadCrumbTitle="Products"
					breadCrumbActive="Products"
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
							getResultsDebounce={getProductsDebounce}
							handleSidebar={this.handleSidebar}
							pageParams={pageParams}
							setPageParams={setPageParams}/>

						<ShowProducts
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
								taxCategories={taxCategories}
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
							adCode={ads.midTier}
						/>
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	const {
		products,
		selectedProduct,
		pageParams,
		sidebar,
		tour,
	} = state.products.toJS()
	const {
		loading,
		productCategories,
	} = state.categories.toJS()
	const {
		measureSystems,
	} = state.common.toJS()
	const {
		taxCategories,
	} = state.taxes.toJS()
	const {
		isMobile,
		ads,
	} = state.common.toJS()
	return {
		loading,
		products,
		productCategories,
		measureSystems,
		selectedProduct,
		pageParams,
		sidebar,
		taxCategories,
		isMobile,
		tour,
		ads,
	}
}

export default connect(mapStateToProps, {
	getProducts,
	getProductDetails,
	getProductCategories,
	deleteProduct,
	selectProduct,
	getMeasureSystemRequest,
	deleteVariableProduct,
	getProductsDebounce,
	setPageParams,
	setSidebar,
	getTaxCategories,
	setTour,
})(Products)
