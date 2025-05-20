import React, {useCallback, useState} from "react"
import {
	Input,
	Popover,
	PopoverBody,
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
	Plus, X, Star,
} from "react-feather"
import {connect} from "react-redux"
import productActions from "../../../../redux/products/actions"
import categoryActions from "../../../../redux/categories/actions";
import commonActions from "../../../../redux/common/actions"
import variationActions from "../../../../redux/variations/actions";
import taxActions from "../../../../redux/taxes/actions";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import classnames from "classnames"
import "../../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../../assets/scss/pages/data-list.scss"
import Sidebar from "./ProductDetailsSidebar"
import AttributesSidebar from "./ProductAttributesSidebar"
import RecipesSidebar from "./ProductRecipesSidebar"
import ImagesSidebar from "./ProductImagesSidebar"
import VariationsSidebar from "./ProductVariationsSidebar"
import SidebarOverlay from "../../../components/SidebarOverlay";
import PopConfirm from "../../../components/PopConfirm";
import {useDropzone} from "react-dropzone";
import {Link} from "react-router-dom";
import "../../../../assets/scss/pages/app-ecommerce-shop.scss"
import defaultCakeImg from "../../../../assets/img/other/default-cake.jpg"
import featuredImg from "../../../../assets/img/other/featured-label.png"
import Skeleton from 'react-loading-skeleton'
import CropModal from "../../../components/modal/CropModal";
import Joyride, {STATUS} from "react-joyride";
import {getTourState, setTourState} from "../../../../helpers/utility";
import ProductGeneralDetails from "./embedded/ProductGeneralDetails";

const {
	selectVariation,
	deleteVariations,
} = variationActions

const {
	getTaxCategories,
} = taxActions

const {
	getProducts,
	getProductDetails,
	deleteProduct,
	selectProduct,
	selectAttribute,
	selectRecipe,
	deleteProductAttribute,
	deleteProductRecipe,
	getSimpleProductImages,
	addSimpleProductImages,
	updateSimpleProductImages,
	deleteSimpleProductImages,
	selectProductImage,
	getProductVariations,
	deleteVariableProductAttribute,
	addVariableProductAttributeValue,
	deleteVariableProductAttributeValue,
	resetProductImages,
	generateProductVariations,
	setSidebar,
	setRecipeAmount,
	setTour,
} = productActions

const {
	getProductCategories,
} = categoryActions

const {
	getMeasureSystemRequest
} = commonActions

const Dropzone = (props) => {

	const fileUpload = (file, filename) => {
		props.addSimpleProductImages({
			file,
			sid: props.match.params.sid,
			filename
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

	const handleFileUpload = (file, filename) => {

		fileUpload(file, filename);
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
				<Button
					block
					className={'mb-1'}
					color={'warning'}
					type="button"
					onClick={open}
				>
					Upload picture
				</Button>
			</div>
		</div>
	);
}

const CustomHeader = props => {
	return (
		<Row>
			<Col sm={8} md={9} lg={10}>
				<h4>Attributes</h4>
			</Col>
			<Col sm={4} md={3} lg={2}>
				<Button
					className="add-new-btn mb-1"
					color="success"
					onClick={() => {
						props.selectAttribute({})
						props.handleSidebar(true, 'add')
					}}
					block
				>
					<Plus size={15}/>
					<span className="align-middle">Add New</span>
				</Button>
			</Col>
		</Row>
	)
}

const RecipeHeader = props => {
	return (
		<Row>
			<Col sm={8} md={9} lg={10}>
				<h4>Recipes</h4>
			</Col>
			<Col sm={4} md={3} lg={2}>
				<Button
					className="add-new-btn mb-1"
					color="success"
					onClick={() => {
						props.selectRecipe({})
						props.handleSidebar(true, 'add')
					}}
					block
				>
					<Plus size={15}/>
					<span className="align-middle">Add New</span>
				</Button>
			</Col>
		</Row>
	)
}

const ImageHeader = props => {
	return (
		<Row>
			<Col sm={8} md={9} lg={10}>
				<h4>Images</h4>
			</Col>
			<Col sm={4} md={3} lg={2}>
				<Dropzone
					{...props}
					addSimpleProductImages={props.addSimpleProductImages}
				/>
			</Col>
		</Row>
	)
}

const VariationHeader = props => {
	return (
		<Row>
			<Col sm={4} md={6} xl={7}>
				<h4>Variations</h4>
			</Col>
			<Col xs={12} sm={4} md={3} xl={3}>
				<Button
					block
					className="add-new-btn mb-1"
					color="warning"
					onClick={() => {
						props.generateProductVariations({sid: props.selectedProduct.sid})
					}}

				>
					<span className="align-middle">Generate variations</span>
				</Button>
			</Col>
			<Col xs={12} sm={4} md={3} xl={2}>
				<Button
					block
					className="add-new-btn mb-1"
					color="success"
					onClick={() => {
						props.selectVariation({})
						props.handleSidebar(true, 'add')
					}}

				>
					<Plus size={15}/>
					<span className="align-middle">Add New</span>
				</Button>
			</Col>
		</Row>
	)
}

class SingleAttribute extends React.Component {

	state = {
		popoverOpen: false,
		newValue: ''
	}

	togglePopover = () => {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		})
	}

	changeValue = (e) => {
		this.setState({newValue: e.target.value})
	}

	addAttributeValue = () => {
		this.props.addVariableProductAttributeValue({
			pid: this.props.selectedProduct.sid,
			aid: this.props.data.sid,
			value: this.state.newValue
		})
		this.setState({popoverOpen: false})
	}

	deleteAttributeValue = (value) => {
		this.props.deleteVariableProductAttributeValue({
			pid: this.props.selectedProduct.sid,
			aid: this.props.data.sid,
			value: value.name
		})
	}

	deleteItem = () => {
		if (this.props.selectedProduct.is_variable) {
			this.props.deleteVariableProductAttribute({
				pid: this.props.selectedProduct.sid,
				sid: this.props.data.sid
			})
		} else {
			this.props.deleteProductAttribute({
				pid: this.props.selectedProduct.sid,
				sid: this.props.data.sid
			})
		}
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const { data, handleSidebar, selectAttribute, selectedProduct } = this.props
		return (
			<Card>
				<CardHeader>
					<CardTitle>
						{data.name}
					</CardTitle>
					<Row>
						<Col xs={12}>
							<Edit
								className="cursor-pointer mr-1"
								size={20}
								onClick={ () => {
									selectAttribute({...data})
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
				</CardHeader>
				<CardBody>
					<Row>
						<Col xs={12} className="font-medium-2">
							{ selectedProduct.is_variable
								?
									data.values.map(value =>
										<span key={value.name} >
											<Badge className="mr-1" pill color="success">
												{value.name}
											</Badge>
											<span onClick={() => this.deleteAttributeValue(value)} className="close-button">x</span>
											<Popover
												placement="top"
												target={selectedProduct.sid + data.sid}
												isOpen={this.state.popoverOpen}
												toggle={this.togglePopover}
											>
												<PopoverBody>
													<Row>
														<Col sm={7}>
															<Input onChange={this.changeValue} value={this.state.value} />
														</Col>
														<Col sm={5}>
															<Button onClick={() => this.addAttributeValue()} size="small" color="success">Add</Button>
														</Col>
													</Row>
												</PopoverBody>
										  </Popover>
										</span>
									)
								:
									<Badge pill color="success">{data.value}</Badge>
							}
							{selectedProduct.is_variable && <Badge pill className="cursor-pointer" color="warning" id={selectedProduct.sid + data.sid}>+</Badge>}
						</Col>
					</Row>
				</CardBody>
			</Card>
		)
	}
}

class SingleImage extends React.Component {

	deleteItem = () => {
		this.props.deleteSimpleProductImages({
			pid: this.props.selectedProduct.sid,
			sid: this.props.image.sid
		})
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const { handleSidebar, image, selectedProduct, selectProductImage } = this.props
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
								this.props.updateSimpleProductImages({
									pid: selectedProduct.sid,
									sid: image.sid,
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


class SingleVariation extends React.Component {

	deleteItem = () => {
		this.props.deleteVariations(
	{
				sid: this.props.variation.sid,
				pid: this.props.selectedProduct.sid
			},
			this.props.history
		)
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const { variation, selectedProduct, selectVariation } = this.props

		const redirect = () => {
			selectVariation(variation)
			this.props.history.push("/products/" + selectedProduct.sid + "/variations/" + variation.sid)
		}

		return (
			<Card
				className="ecommerce-card"
				key={variation.sid}
			>
				<div className="card-content">
					<div className="item-img text-center cursor-pointer" onClick={() => {
						redirect()
					}}>
						{variation.featured_image
							?
							<img className="img-fluid" src={variation.featured_image + '?d=400x300'} alt={variation.name}/>
							:
							<img src={defaultCakeImg} width={300} height={'auto'} alt="featured image"/>
						}
					</div>
					<CardBody>
						<div className="item-wrapper">
							<div className="item-rating">
							</div>
						</div>
						<div className="item-name cursor-pointer" onClick={() => {
							redirect()
						}}>
							<span>{variation.name}</span>
						</div>
						<div className="item-desc">
							<p className="item-description">{variation.description}</p>
						</div>
					</CardBody>
					<div className="item-options text-center">
						<div className="item-wrapper">
							<div className="item-rating">
								<Badge color="primary" className="badge-md">
									<span className="mr-50 align-middle">{variation.stars}</span>
									<Star size={14}/>
								</Badge>
							</div>
							<div className="product-price">
								<h6 className="item-price">{variation.price}</h6>
							</div>
						</div>

						<div id={variation.sid} className="wishlist" onClick={() => {this.triggerPopover()}}>
							<X size={15}/>
							<span className="align-middle ml-50">Remove</span>
						</div>
						<PopConfirm
							ref={popconfirm => this.popconfirm = popconfirm}
							targetId={variation.sid}
							deleteAction={this.deleteItem}
							showPopover={this.showPopover}
						/>

					</div>
				</div>
			</Card>
		)
	}
}

class SingleRecipe extends React.Component {

	deleteItem = () => {
		this.props.deleteProductRecipe({
			pid: this.props.selectedProduct.sid,
			sid: this.props.recipe.recipe.sid
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
							Amount: {(Math.round(recipe.amount * 100) / 100).toFixed(2)} {recipe.recipe.yield_measure_unit.name}
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

const ShowProductAttributes = props => {
	const {selectedProduct, handleSidebar} = props
	return selectedProduct.attributes ? (selectedProduct.attributes.map(attribute => (
			<SingleAttribute
				{...props}
				data={attribute}
				key={attribute.sid}
				handleSidebar={handleSidebar}
			/>
	))) : (<div/>)
}

const ShowProductRecipes = props => {
	const {selectedProduct, handleSidebar} = props
	return selectedProduct.recipes ? (selectedProduct.recipes.map(recipe => (
			<SingleRecipe
				{...props}
				recipe={recipe}
				key={recipe.recipe.sid}
				handleSidebar={handleSidebar}
			/>
	))) : (<div/>)
}

//TODO - make it show actual pictures
const ShowProductImages = props => {
	const {productImages, handleSidebar} = props
	return productImages ? (productImages.map(image => (
			<SingleImage
				{...props}
				image={image}
				key={image.sid}
				handleSidebar={handleSidebar}
			/>
	))) : (<div/>)
}

const ShowProductVariations = props => {
	const {productVariations, handleSidebar} = props
	return productVariations ? (productVariations.map(variation => (
		<SingleVariation
			{...props}
			variation={variation}
			key={variation.sid}
			handleSidebar={handleSidebar}
		/>
	))) : (<div/>)
}

class ProductDetails extends React.Component {

	state = {
		action: 'add',
		active: "general",
		tourStatus: getTourState(),
	}

	toggle = tab => {
		if (this.state.active !== tab) {
			this.setState({ active: tab })
		}
	}

	componentDidMount() {
		this.props.selectProduct({})
		this.props.resetProductImages()
		this.props.getSimpleProductImages({sid: this.props.match.params.sid})
		if (this.props.match.params.activeTab) {
			this.setState({active: this.props.match.params.activeTab})
		}
		this.props.getProductDetails({sid: this.props.match.params.sid})
		this.props.getProductCategories()
		this.props.getTaxCategories()

		this.props.setTour(
			{
				steps: [
					{
						content: <div>Product general information (product category, is it recipe based, price, etc.)</div>,
						placement: 'left',
						target: '.product-general',
						title: 'General information',
						disableBeacon: true,
					},
					{
						content: <div>Product can have one or more attributes (like color, etc.)</div>,
						placement: 'left',
						target: '.product-attributes',
					},
					{
						content: <div>
							If the product is a recipe based product then it can be based on one
							or several recipes.
						</div>,
						placement: 'left',
						target: '.product-recipes',
					},
					{
						content: <div>List of product images</div>,
						placement: 'left',
						target: '.product-images',
					},
				]
			});
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

	handleAttributesSidebar = (boolean, action = 'add') => {
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean, 'attributesSidebar')
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

	handleVariationsSidebar = (boolean, action = 'add') => {
		this.setState({
			action: action
		})
		this.props.setSidebar(boolean, 'variationsSidebar')
	}

	handleJoyrideCallback = data => {
		const { status } = data;

		if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
			setTourState({productDetails: 1})
		}
	};

	render() {

		const {
			selectedProduct,
			sidebar,
			attributesSidebar,
			recipesSidebar,
			imagesSidebar,
			variationsSidebar
		} = this.props
		const { run, steps, stepIndex } = this.props.tour;
		const { tourStatus } = this.state;

		return (

			<React.Fragment>

				{(!tourStatus.hasOwnProperty('productDetails') || tourStatus.productDetails !== 1) &&
				<Joyride
					continuous={true}
					steps={steps}
					showProgress={true}
					showSkipButton={true}
					hideBackButton={true}
					callback={this.handleJoyrideCallback}
				/>}

				<Breadcrumbs
					breadCrumbTitle="Product Details"
					breadCrumbParent="Products"
					parentLink="/products"
					breadCrumbActive="Product Details"
				/>

				<Row className="mb-1">
					<Col xs={12}>
						<h3>{this.props.selectedProduct.name || <Skeleton />}</h3>
					</Col>
				</Row>

				<Row>
					<Col xs="12">

						<ProductGeneralDetails
							{...this.props}
							handleSidebar={this.handleSidebar}
						/>

						<Card className="product-attributes">
							<CardBody>
								<CustomHeader
									{...this.props}
									handleSidebar={this.handleAttributesSidebar}
								/>

								<ShowProductAttributes
									{...this.props}
									handleSidebar={this.handleAttributesSidebar}
								/>
							</CardBody>
						</Card>

						{!selectedProduct.is_variable && <Card className="product-recipes">
							<CardBody>
								<RecipeHeader
									{...this.props}
									handleSidebar={this.handleRecipesSidebar}
								/>

								<ShowProductRecipes
									{...this.props}
									handleSidebar={this.handleRecipesSidebar}
								/>
							</CardBody>
						</Card>}

						<Card className="product-images">
							<CardBody>
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
							</CardBody>
						</Card>

						{selectedProduct.is_variable && <Card>
							<CardBody>
								<VariationHeader
									{...this.props}
									handleSidebar={this.handleVariationsSidebar}
									handleAttributeSidebar={this.handleAttributesSidebar}
								/>

								<div className="ecommerce-application">
									<div className="grid-view wishlist-items">
										<ShowProductVariations
											{...this.props}
											handleSidebar={this.handleVariationsSidebar}
											handleAttributeSidebar={this.handleAttributesSidebar}
										/>
									</div>
								</div>
							</CardBody>
						</Card>}

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
							<AttributesSidebar
								show={attributesSidebar}
								handleSidebar={this.handleAttributesSidebar}
								action={this.state.action}
							/>
							<SidebarOverlay
								sidebar={attributesSidebar}
								handleSidebar={this.handleAttributesSidebar}
							/>
							<RecipesSidebar
								{...this.props}
								show={recipesSidebar}
								handleSidebar={this.handleRecipesSidebar}
								action={this.state.action}
							/>
							<SidebarOverlay
								sidebar={recipesSidebar}
								handleSidebar={this.handleRecipesSidebar}
							/>
							<ImagesSidebar
								show={imagesSidebar}
								handleSidebar={this.handleImagesSidebar}
								action={this.state.action}
							/>
							<SidebarOverlay
								sidebar={imagesSidebar}
								handleSidebar={this.handleImagesSidebar}
							/>
							<VariationsSidebar
								{...this.props}
								show={variationsSidebar}
								handleSidebar={this.handleVariationsSidebar}
								handleAttributeSidebar={this.handleAttributesSidebar}
								action={this.state.action}
							/>
							<SidebarOverlay
								sidebar={variationsSidebar}
								handleSidebar={this.handleVariationsSidebar}
								handleAttributeSidebar={this.handleAttributesSidebar}
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
		selectedProduct,
		productCategories,
		products,
		productImages,
		selectedProductImage,
		productVariations,
		imagesRequestDone,
		sidebar,
		attributesSidebar,
		recipesSidebar,
		imagesSidebar,
		variationsSidebar,
		selectedRecipe,
		recipeAmount,
		tour,
	} = state.products.toJS()
	const {
		measureSystems,
	} = state.common.toJS()
	const {
		taxCategories,
	} = state.taxes.toJS()
	return {
		loading,
		selectedProduct,
		products,
		productCategories,
		measureSystems,
		productImages,
		selectedProductImage,
		productVariations,
		imagesRequestDone,
		taxCategories,
		sidebar,
		attributesSidebar,
		recipesSidebar,
		imagesSidebar,
		variationsSidebar,
		selectedRecipe,
		amount: recipeAmount,
		tour,
	}
}

export default connect(mapStateToProps, {
	selectAttribute,
	selectRecipe,
	deleteProductAttribute,
	getProducts,
	getProductDetails,
	getProductCategories,
	deleteProduct,
	selectProduct,
	getMeasureSystemRequest,
	deleteProductRecipe,
	getSimpleProductImages,
	addSimpleProductImages,
	updateSimpleProductImages,
	deleteSimpleProductImages,
	selectProductImage,
	getProductVariations,
	deleteVariableProductAttribute,
	selectVariation,
	resetProductImages,
	generateProductVariations,
	deleteVariations,
	addVariableProductAttributeValue,
	deleteVariableProductAttributeValue,
	getTaxCategories,
	setSidebar,
	setRecipeAmount,
	setTour,
})(ProductDetails)
