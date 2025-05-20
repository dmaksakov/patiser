import React, {useCallback, useState} from "react"
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Row,
	Col,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Badge,
} from "reactstrap"
import {
	Edit,
	Trash,
	Plus,
	X,
	Star,
} from "react-feather"
import {connect} from "react-redux"
import productActions from "../../../../../redux/products/actions"
import variationActions from "../../../../../redux/variations/actions"
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import classnames from "classnames"
import "../../../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../../../assets/scss/pages/data-list.scss"
import Sidebar from "../ProductVariationsSidebar"
import RecipesSidebar from "../ProductRecipesSidebar"
import ImagesSidebar from "../ProductImagesSidebar"
import SidebarOverlay from "../../../../components/SidebarOverlay"
import PopConfirm from "../../../../components/PopConfirm"
import {useDropzone} from "react-dropzone"
import {Link} from "react-router-dom"
import "../../../../../assets/scss/pages/app-ecommerce-shop.scss"
import defaultCakeImg from "../../../../../assets/img/other/default-cake.jpg"
import featuredImg from "../../../../../assets/img/other/featured-label.png"
import Skeleton from "react-loading-skeleton";
import CropModal from "../../../../components/modal/CropModal";

const {
	getProducts,
	getProductDetails,
	selectRecipe,
	getProductVariations,
	selectProductImage,
	setRecipeAmount,
} = productActions

const {
	getVariationDetails,
	createVariationsRecipe,

	getVariationsImages,
	addVariationsImage,
	updateVariationsImage,
	deleteVariationsImage,

	deleteVariations,
	deleteVariationsRecipe,

	setSidebar,
} = variationActions

const Dropzone = (props) => {

	const fileUpload = (file) => {
		props.addVariationsImage({
			file,
			sid: props.match.params.sid
		})
	}

	const onDrop = useCallback((acceptedFiles) => {
		setCurrentImage(acceptedFiles[0]);
		setOpen(true);
	}, [])

	const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
		// Disable click and keydown behavior
		accept: "image/*",
		onDrop,
		noClick: true,
		noKeyboard: true
	});

	let [isOpen, setOpen] = useState(false);
	let [isSaving, setSaving] = useState(false);
	let [currentImage, setCurrentImage] = useState("");
	const toggleCropModal = () => {
		setOpen(!isOpen);
	}

	const handleFileUpload = (file) => {
		fileUpload(file)
		setSaving(false);
		setOpen(false);
	}

	return (
		<div className="">
			<CropModal
				title="Edit Logo before uploading"
				isOpen={isOpen}
				isSaving={isSaving}
				setSaving={setSaving}
				toggleOpen={toggleCropModal}
				file={currentImage}
				onFinish={handleFileUpload}
				ratio={9/6}
			/>
			<div {...getRootProps({className: 'dropzone'})}>
				<input {...getInputProps()} />
				<Button className={'mb-1'} color={'warning'} type="button" onClick={open}>
					Upload picture
				</Button>
			</div>
		</div>
	);
}

const RecipeHeader = props => {
	return (
		<Button
			className="add-new-btn mb-1"
			color="primary"
			onClick={() => {
				props.selectRecipe({})
				props.handleSidebar(true, 'add')
			}}
			outline
		>
			<Plus size={15}/>
			<span className="align-middle">Add New</span>
		</Button>
	)
}

const ImageHeader = props => {
	return (
		<Dropzone
			{...props}
			addVariationsImage={props.addVariationsImage}
		/>
	)
}

class ShowProductVariationDetails extends React.Component {

	deleteItem = () => {
		this.props.deleteVariations(
			{
				sid: this.props.selectedVariation.sid,
				pid: this.props.selectedProduct.sid
			},
			this.props.history
		)
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const { handleSidebar, selectedVariation, loading, imagesRequestDone, company } = this.props

		return (
			<Card>
				<CardHeader>
					<CardTitle>
						<Row>
							<Col sm={12}>
								{loading ? <Skeleton /> : selectedVariation.name}
							</Col>
						</Row>
					</CardTitle>
					<Row>
						<Col sm={12}>
							<Edit
								className="cursor-pointer mr-1"
								size={20}
								onClick={ () => {
									getVariationDetails({
										...selectedVariation
									})
									handleSidebar(true, 'edit')
								}}
							/>
							<Trash
								id={selectedVariation.hasOwnProperty('sid') ? selectedVariation.sid : 'nothing'}
								className="cursor-pointer mr-1"
								size={20}
								onClick={() => {
									this.triggerPopover()
								}}
							/>
							<PopConfirm
								ref={popconfirm => this.popconfirm = popconfirm}
								targetId={selectedVariation.hasOwnProperty('sid') ? selectedVariation.sid : 'nothing'}
								deleteAction={this.deleteItem}
								showPopover={this.showPopover}
							/>
						</Col>
					</Row>
				</CardHeader>
				<CardBody>
					<Row>
						<Col sm={4}>
							{selectedVariation.featured_image
								?
								loading ? <Skeleton width={300} height={300} /> : <img className="img-fluid" src={selectedVariation.featured_image + '?d=300x300'} alt={selectedVariation.name}/>
								:
								imagesRequestDone ? <img src={defaultCakeImg} width={300} height={'auto'} alt="featured image"/> : <Skeleton width={300} height={300} />
							}
						</Col>
						<Col sm={8}>
							<Row>
								<Col sm={3}>
									<p className="text-bold-500">{loading ? <Skeleton /> : 'SKU:'}</p>
								</Col>
								<Col sm={9}>
									<p>{loading ? <Skeleton /> : selectedVariation.sku ? selectedVariation.sku : ''}</p>
								</Col>
							</Row>
							{company && company.currency && company.currency.code && <Row>
								<Col sm={3}>
									<p className="text-bold-500">{loading ? <Skeleton /> : 'Price:'}</p>
								</Col>
								<Col sm={9}>
									<p>{loading ? <Skeleton /> : company.currency.code + ' ' + selectedVariation.price}</p>
								</Col>
							</Row>}

							{selectedVariation &&
							<>
								<Row className="mt-1">
									<Col xs={12}>
										<h6>Attributes</h6>
									</Col>
								</Row>
								{selectedVariation.attributes && selectedVariation.attributes.map(attr => {
									return 	<Row key={attr.sid} className="mt-1">
												<Col xs={3} className="text-bold-500">{attr.name}</Col>
												<Col xs={9}>
													<Badge className="badge-glow" color="info" size="md">{attr.value}</Badge>
												</Col>
											</Row>
								})}
							</>
							}
						</Col>
					</Row>

				</CardBody>
			</Card>
		)
	}
}

class SingleImage extends React.Component {

	deleteItem = () => {
		this.props.deleteVariationsImage({
			vid: this.props.selectedVariation.sid,
			aid: this.props.image.sid
		})
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const { handleSidebar, image, selectedVariation, selectProductImage, updateVariationsImage } = this.props
		return (
			<Card
				className="ecommerce-card"
				key={image.sid}
			>
				{image.featured && <img className="featured" src={featuredImg} alt="featured" />}
				<div className="card-content">
					<div className="item-img text-center">
						<Link to="#">
							<img className="img-fluid" src={image.url + '?d=400x300'} alt={image.name}/>
						</Link>
					</div>
					<CardBody>
						<div className="item-wrapper">
							<div className="item-rating">
							</div>
						</div>
						<div className="item-name">
							<Link to="#">
								<span>{image.name}</span>
							</Link>
						</div>
						<div className="item-desc">
							<p className="item-description">{image.description}</p>
						</div>
					</CardBody>
					<div className="item-options text-center">
						<div className="item-wrapper">
							<div className="item-rating">
								<Badge color="primary" className="badge-md">
									<span className="mr-50 align-middle">{image.stars}</span>
									<Star size={14}/>
								</Badge>
							</div>
							<div className="product-price">
								<h6 className="item-price">{image.price}</h6>
							</div>
						</div>
						<div
							className="wishlist"
							onClick={() => {
								selectProductImage({...image})
								handleSidebar(true, 'edit')
							}}
						>
							<Edit size={15}/>
							<span className="align-middle ml-50">Edit</span>
						</div>
						<div id={image.sid} className="wishlist" onClick={() => {this.triggerPopover()}}>
							<X size={15}/>
							<span className="align-middle ml-50">Remove</span>
						</div>
						<PopConfirm
							ref={popconfirm => this.popconfirm = popconfirm}
							targetId={image.sid}
							deleteAction={this.deleteItem}
							showPopover={this.showPopover}
						/>
						<div
							className="cart"
							onClick={() => {
								updateVariationsImage({
									vid: selectedVariation.sid,
									aid: image.sid,
									name: image.name,
									description: image.description ? image.description : '',
									featured: true
								})}}
						>
							<Star size={14}/>
							<span className="align-middle ml-50">Make featured</span>
						</div>
					</div>
				</div>
			</Card>
		)
	}
}

class SingleRecipe extends React.Component {

	deleteItem = () => {
		this.props.deleteVariationsRecipe({
			pid: this.props.selectedProduct.sid,
			rid: this.props.recipe.recipe.sid,
			vid: this.props.selectedVariation.sid
		})
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const { recipe, handleSidebar, selectRecipe } = this.props
		return (
			<Card>
				<CardHeader>
					<CardTitle>
						<Row>
							<Col sm={12}>
								Recipe: {recipe.recipe.name}
							</Col>
						</Row>
					</CardTitle>
					<Row>
						<Col sm={12}>
							<Edit
								className="cursor-pointer mr-1"
								size={20}
								onClick={ () => {
									selectRecipe({...recipe})
									handleSidebar(true, 'edit')
								}}
							/>
							<Trash
								id={recipe.recipe.sid}
								className="cursor-pointer mr-1"
								size={20}
								onClick={() => {
									this.triggerPopover()
								}}
							/>
							<PopConfirm
								ref={popconfirm => this.popconfirm = popconfirm}
								targetId={recipe.recipe.sid}
								deleteAction={this.deleteItem}
								showPopover={this.showPopover}
							/>
						</Col>
					</Row>
				</CardHeader>
				<CardBody>
					<Row>
						<Col sm={12}>
							Notes: {recipe.notes}
						</Col>
						<Col sm={12}>
							Amount: {(Math.round(recipe.amount * 100) / 100).toFixed(2)}
						</Col>
						<Col sm={12}>
							Total: {recipe.total_formatted}
						</Col>
					</Row>
				</CardBody>
			</Card>
		)
	}
}

const ShowProductRecipes = props => {
	const {selectedVariation, handleSidebar} = props
	return selectedVariation.recipes ? (selectedVariation.recipes.map(recipe => (
			<SingleRecipe
				{...props}
				recipe={recipe}
				key={recipe.recipe.sid}
				handleSidebar={handleSidebar}
			/>
	))) : (<div/>)
}

const ShowProductImages = props => {
	const { variationImages, handleSidebar} = props
	return variationImages ? (variationImages.map(image => (
			<SingleImage
				{...props}
				image={image}
				key={image.sid}
				handleSidebar={handleSidebar}
			/>
	))) : (<div/>)
}

class ProductVariationDetails extends React.Component {

	state = {
		sidebar: false,
		attributesSidebar: false,
		recipesSidebar: false,
		imagesSidebar: false,
		variationsSidebar: false,
		action: 'add',
		active: "1"
	}

	toggle = tab => {
		if (this.state.active !== tab) {
			this.setState({ active: tab })
		}
	}

	componentDidMount() {
		if (!this.props.selectedVariation.sid) {
			this.props.getProductDetails({
				sid: this.props.match.params.pid,
				vid: this.props.match.params.sid
			})
			this.props.getVariationDetails({
				vid: this.props.match.params.sid
			})
		}
		this.props.getVariationsImages({vid: this.props.match.params.sid})
	}

	handleSidebar = (boolean, action = 'add') => {
		if (action === 'add') {
			this.props.selectProduct({})
		}
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean)
	}

	handleRecipesSidebar = (boolean, action = 'add') => {
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean, 'recipesSidebar')
		this.props.setRecipeAmount(0)
	}

	handleImagesSidebar = (boolean, action = 'add') => {
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean, 'imagesSidebar')
	}

	render() {

		const {
			selectedVariation,
			loading,
			selectedProduct,
			sidebar,
			imagesSidebar,
			recipesSidebar
		} = this.props

		return (
			<React.Fragment>

				<Breadcrumbs
					breadCrumbTitle="Variation Details"
					breadCrumbParent="Products"
					breadCrumbParent2={selectedProduct.name}
					breadCrumbParent3="Variations"
					parentLink="/products"
					parentLink2={`/products/${selectedProduct.sid}`}
					parentLink3={`/products/${selectedProduct.sid}/variations`}
					breadCrumbActive="Variation Details"
				/>

				<h3>{loading ? <Skeleton /> : selectedVariation.name}</h3>

				<Row>
					<Col sm="12">
						<Nav tabs>

							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.active === "1"
									})}
									onClick={() => {
										this.toggle("1")
									}}
								>
									General
								</NavLink>
							</NavItem>

							{selectedProduct.is_recipe_based && <NavItem>
								<NavLink
									className={classnames({
										active: this.state.active === "2"
									})}
									onClick={() => {
										this.toggle("2")
									}}
								>
									Recipes
								</NavLink>
							</NavItem>}

							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.active === "3"
									})}
									onClick={() => {
										this.toggle("3")
									}}
								>
									Images
								</NavLink>
							</NavItem>

						</Nav>

						<TabContent activeTab={this.state.active}>
							<TabPane tabId="1">
								<ShowProductVariationDetails
									{...this.props}
									handleSidebar={this.handleSidebar}
								/>
							</TabPane>

							{selectedProduct.is_recipe_based && <TabPane tabId="2">
								<RecipeHeader
									{...this.props}
									handleSidebar={this.handleRecipesSidebar}
								/>

								<ShowProductRecipes
									{...this.props}
									handleSidebar={this.handleRecipesSidebar}
								/>
							</TabPane>}

							<TabPane tabId="3">
								<ImageHeader
									{...this.props}
									handleSidebar={this.handleImagesSidebar}
								/>

								<div className="ecommerce-application">
									<div className="grid-view wishlist-items">
										<ShowProductImages
											{...this.props}
											handleSidebar={this.handleImagesSidebar}
										/>
									</div>
								</div>

							</TabPane>

						</TabContent>


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

							<RecipesSidebar
								{...this.props}
								show={recipesSidebar}
								handleSidebar={this.handleRecipesSidebar}
								action={this.state.action}
								variation={true}
							/>
							<SidebarOverlay
								sidebar={recipesSidebar}
								handleSidebar={this.handleRecipesSidebar}
							/>

							<ImagesSidebar
								{...this.props}
								show={imagesSidebar}
								handleSidebar={this.handleImagesSidebar}
								action={this.state.action}
								variation={true}
							/>
							<SidebarOverlay
								sidebar={imagesSidebar}
								handleSidebar={this.handleImagesSidebar}
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
		selectedProduct,
		productVariations,
		selectedProductImage,
		recipeAmount,
		selectedRecipe,
	} = state.products.toJS()
	const {
		loading,
		imagesRequestDone,
		variationImages,
		selectedVariation,
		sidebar,
		imagesSidebar,
		recipesSidebar,
	} = state.variation.toJS()
	return {
		loading,
		imagesRequestDone,
		selectedVariation,
		selectedProduct,
		productVariations,
		variationImages,
		selectedProductImage,
		sidebar,
		imagesSidebar,
		recipesSidebar,
		amount: recipeAmount,
		selectedRecipe,
		company: state.account.toJS().profile.company,
	}
}

export default connect(mapStateToProps, {
	deleteVariationsRecipe,
	selectRecipe,
	getProducts,
	getProductDetails,
	createVariationsRecipe,
	getProductVariations,
	getVariationsImages,
	addVariationsImage,
	deleteVariations,
	deleteVariationsImage,
	selectProductImage,
	updateVariationsImage,
	getVariationDetails,
	setSidebar,
	setRecipeAmount,
})(ProductVariationDetails)
