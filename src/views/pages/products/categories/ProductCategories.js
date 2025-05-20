import React from "react"
import {
	Card,
	CardHeader,
	CardTitle,
	Row,
	Col,
} from "reactstrap"
import {
	Edit,
	Trash,
} from "react-feather"
import {connect} from "react-redux"
import categoryActions from "../../../../redux/categories/actions"
import commonActions from "../../../../redux/common/actions"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "../../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../../assets/scss/pages/data-list.scss"
import Sidebar from "./CategorySidebar"
import SidebarOverlay from "../../../components/SidebarOverlay";
import PopConfirm from "../../../components/PopConfirm";
import Pagination from "../../../components/Pagination";
import SearchBar from "../../../components/SearchBar";
import {IFrameAd} from "../../IFrameAd";

const {
	getProductCategories,
	deleteProductCategory,
	selectProductCategory,
	getProductCategoriesDebounce,
	setPageParams,
	setSidebar,
} = categoryActions

const {
	getMeasureSystemRequest
} = commonActions


class SingleProductCategory extends React.Component {

	deleteItem = () => {
		this.props.deleteProductCategory({sid: this.props.data.sid})
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const {data, handleSidebar, selectProductCategory, isMobile} = this.props

		const showActions =
			<>
				<Edit
					className="cursor-pointer mr-1"
					size={20}
					onClick={ () => {
						selectProductCategory({
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
						this.triggerPopover()
					}}
				/>
				<PopConfirm
					ref={popconfirm => this.popconfirm = popconfirm}
					targetId={data.sid}
					deleteAction={this.deleteItem}
					showPopover={this.showPopover}
				/>
			</>

		return (
			<Row className={'pt-1 pb-1'}>
				<Col xs={8} xl={10}>
					<span className={'ingredient-name'}>{data.name}</span>
				</Col>
				<Col xs={4} xl={2} className={isMobile ? 'text-align-right' : ''}>
					{showActions}
				</Col>
			</Row>
		)
	}
}

const ShowProductCategories = props => {
	const {productCategories, handleSidebar} = props

	return (
		<Card className="table-header">
			<CardHeader>
				<div className={'container-fluid grid-header p-1 d-none d-md-block table-header-rounded'}>
					<Row>
						<Col xs={8} xl={10}>
							Name
						</Col>
						<Col xs={4} xl={2}>
							Actions
						</Col>
					</Row>
				</div>
				<div className={'container-fluid'}>
					{productCategories.map(productCategory => (
						<SingleProductCategory
							{...props}
							data={productCategory}
							key={productCategory.sid}
							handleSidebar={handleSidebar}
						/>
					))}
				</div>
			</CardHeader>
		</Card>
	)
}

class ProductCategories extends React.Component {

	state = {
		sidebar: false,
		action: 'add'
	}

	componentDidMount() {
		this.props.getProductCategories({})
	}

	handleSidebar = (boolean, action = 'add') => {
		if (action === 'add') {
			this.props.selectProductCategory({})
		}
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean)
	}

	changePage = (page) => {
		this.props.setPageParams({page})
		this.props.getProductCategoriesDebounce({
			page,
			pageSize: this.props.pageSize
		})
	}

	render() {
		const {pageParams, getProductCategoriesDebounce, setPageParams, sidebar, ads} = this.props
		const {page, pageSize, total} = pageParams
		const iframe = '<iframe id="iframe" />'

		return (
			<React.Fragment>

				<Breadcrumbs
					breadCrumbTitle="Product Categories"
					breadCrumbParent="Products"
					parentLink="/products"
					breadCrumbActive="Product Categories"
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
							getResultsDebounce={getProductCategoriesDebounce}
							handleSidebar={this.handleSidebar}
							pageParams={pageParams}
							setPageParams={setPageParams}
						/>

						<ShowProductCategories
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
		productCategories,
		pageParams,
		sidebar,
	} = state.categories.toJS()
	const {
		measureSystems,
		isMobile,
		ads,
	} = state.common.toJS()
	return {
		loading,
		productCategories,
		measureSystems,
		pageParams,
		sidebar,
		isMobile,
		ads,
	}
}

export default connect(mapStateToProps, {
	getProductCategories,
	deleteProductCategory,
	selectProductCategory,
	getMeasureSystemRequest,
	getProductCategoriesDebounce,
	setPageParams,
	setSidebar,
})(ProductCategories)
