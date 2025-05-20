import React from "react"
import {
	Card,
	CardHeader,
	Row,
	Col, Button,
} from "reactstrap"
import {
	Edit, Plus,
	Trash,
} from "react-feather"
import {connect} from "react-redux"
import taxActions from "../../../redux/taxes/actions"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import Sidebar from "./TaxCategorySidebar"
import SidebarOverlay from "../../components/SidebarOverlay"
import PopConfirm from "../../components/PopConfirm"
import Pagination from "../../components/Pagination";
import {IFrameAd} from "../IFrameAd";

const {
	getTaxCategories,
	deleteTaxCategory,
	selectTaxCategory,
	setPageParams,
	setSidebar,
} = taxActions

class SingleTaxCategory extends React.Component {

	deleteItem = () => {
		this.props.deleteTaxCategory({sid: this.props.data.sid})
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const {data, handleSidebar, selectTaxCategory, isMobile} = this.props

		const showActions =
			<>
				<Edit
					className="cursor-pointer mr-1"
					size={20}
					onClick={ () => {
						selectTaxCategory({
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

				<Col xs={8} md={4}>
					<span className={'ingredient-name'}>
						{data.name}
					</span>
				</Col>
				{isMobile && <Col xs={4} className="d-block d-md-none text-align-right mb-1">
					{showActions}
				</Col>}

				<Col xs={6} className={'d-block d-md-none'}>
					Description:
				</Col>
				<Col xs={6} md={4}>
					{data.description}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					Percentage:
				</Col>
				<Col xs={6} md={2}>
					{data.percentage}
				</Col>

				<Col md={2} className={'d-none d-md-block'}>
					{showActions}
				</Col>

			</Row>
		)
	}
}

const ShowTaxCategories = props => {
	const {taxCategories, handleSidebar} = props

	return (
		<Card className="table-header">
			<CardHeader>
				<div className={'container-fluid grid-header p-1 d-none d-md-block table-header-rounded'}>
					<Row>
						<Col md={4}>
							Name
						</Col>
						<Col md={4}>
							Description
						</Col>
						<Col md={2}>
							Percentage
						</Col>
						<Col md={2}>
							Actions
						</Col>
					</Row>
				</div>
				<div className={'container-fluid'}>
					{taxCategories.map(taxCategory => (
						<SingleTaxCategory
							{...props}
							data={taxCategory}
							key={taxCategory.sid}
							handleSidebar={handleSidebar}
						/>
					))}
				</div>
			</CardHeader>
		</Card>
	)
}

class TaxCategories extends React.Component {

	state = {
		sidebar: false,
		action: 'add'
	}

	componentDidMount() {
		this.props.getTaxCategories({})
	}

	handleSidebar = (boolean, action = 'add') => {
		if (action === 'add') {
			this.props.selectTaxCategory({})
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
		const {pageParams, sidebar, ads} = this.props
		const {page, pageSize, total} = pageParams
		const iframe = '<iframe id="iframe" />'

		return (
			<React.Fragment>

				<Breadcrumbs
					breadCrumbTitle="Tax Categories"
					breadCrumbActive="Tax Categories"
				/>
				<Row>
					<Col sm="12">

						<div className="text-align-right">
							<Button
								className="add-new-btn mt-1 line-height-normal mb-1"
								color="success"
								onClick={() => this.handleSidebar(true, 'add')}

							>
								<Plus size={15}/>
								<span className="align-middle">Add New</span>
							</Button>
						</div>

						<ShowTaxCategories
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
		taxCategories,
		pageParams,
		sidebar,
	} = state.taxes.toJS()
	const {
		isMobile,
		ads,
	} = state.common.toJS()
	return {
		loading,
		taxCategories,
		pageParams,
		sidebar,
		isMobile,
		ads,
	}
}

export default connect(mapStateToProps, {
	getTaxCategories,
	deleteTaxCategory,
	selectTaxCategory,
	setPageParams,
	setSidebar,
})(TaxCategories)
